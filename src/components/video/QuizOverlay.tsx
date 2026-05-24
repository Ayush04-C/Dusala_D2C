// src/components/video/QuizOverlay.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quiz } from "@/types";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizOverlayProps {
  quiz: Quiz;
}

export function QuizOverlay({ quiz }: QuizOverlayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const { dismissQuiz, saveScore } = usePlayerStore();

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleFinish = () => {
    saveScore(quiz.lessonId, score);
    dismissQuiz();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-40 bg-brand-dark/90 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-brand-ivory w-full max-w-md rounded-2xl p-8 shadow-2xl overflow-hidden"
        >
          {!showResult ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-brand-rose font-bold text-sm uppercase tracking-wider">Pop Quiz</span>
                <span className="text-brand-muted text-xs">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              </div>

              <h3 className="text-xl font-heading font-bold text-brand-dark leading-snug">
                {currentQuestion.question}
              </h3>

              <RadioGroup
                value={selectedOption?.toString()}
                onValueChange={(val) => !isAnswered && setSelectedOption(parseInt(val))}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.correctIndex;
                  const isSelected = index === selectedOption;
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer",
                        isAnswered
                          ? isCorrect
                            ? "border-green-500 bg-green-50"
                            : isSelected
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 opacity-50"
                          : isSelected
                            ? "border-brand-gold bg-brand-gold/5"
                            : "border-gray-200 hover:border-brand-rose/30"
                      )}
                      onClick={() => !isAnswered && setSelectedOption(index)}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="hidden" />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium text-brand-dark">
                        {option}
                      </Label>
                      {isAnswered && isCorrect && <CheckCircle2 className="text-green-500 w-5 h-5" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500 w-5 h-5" />}
                    </div>
                  );
                })}
              </RadioGroup>

              <Button
                onClick={handleAnswer}
                disabled={selectedOption === null || isAnswered}
                className="w-full bg-brand-rose hover:bg-brand-rose/90 text-white h-12"
              >
                {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Submit Quiz"}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-brand-gold w-10 h-10" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-brand-dark">Quiz Completed!</h3>
              <p className="text-brand-muted">
                You scored <span className="text-brand-rose font-bold">{score}</span> out of <span className="font-bold">{quiz.questions.length}</span>
              </p>
              <Button onClick={handleFinish} className="w-full bg-brand-dark hover:bg-brand-dark/90 text-white h-12">
                Continue Lesson
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Helper function to handle class merging
import { cn } from "@/lib/utils";
