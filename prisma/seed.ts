// prisma/seed.ts
import { PrismaClient, Role, Language, SubscriptionPlan } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Helper to read JSON files
  const readData = async (filename: string) => {
    const filePath = path.join(process.cwd(), 'src', 'data', filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  };

  // 1. Seed Users
  const usersData = await readData('users.json');
  for (const user of usersData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        clerkId: `clerk_${user.id}`,
        name: user.name,
        email: user.email,
        role: user.role as Role,
      },
    });
  }

  // 2. Seed Courses
  const coursesData = await readData('courses.json');
  for (const course of coursesData) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: {},
      create: {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        price: course.price,
        language: course.language as Language,
        isPublished: course.isPublished,
      },
    });
  }

  // 3. Seed Lessons
  const lessonsData = await readData('lessons.json');
  for (const lesson of lessonsData) {
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: {},
      create: {
        id: lesson.id,
        courseId: lesson.courseId,
        title: lesson.title,
        videoUrlEn: lesson.videoUrlEn,
        videoUrlHi: lesson.videoUrlHi,
        videoUrlTe: lesson.videoUrlTe,
        duration: lesson.duration,
        order: lesson.order,
      },
    });
  }

  // 4. Seed Quizzes
  const quizzesData = await readData('quizzes.json');
  for (const [lessonId, quiz] of Object.entries<any>(quizzesData)) {
    const createdQuiz = await prisma.quiz.create({
      data: {
        lessonId: lessonId,
        triggerTimestamp: quiz.triggerTimestamp,
      },
    });

    for (const q of quiz.questions) {
      await prisma.quizQuestion.create({
        data: {
          quizId: createdQuiz.id,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
        },
      });
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
