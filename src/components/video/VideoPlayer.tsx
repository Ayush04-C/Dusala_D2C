// src/components/video/VideoPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Plyr } from "plyr-react";
import "plyr/dist/plyr.css";
import { usePlayerStore } from "@/store/usePlayerStore";
import { QuizOverlay } from "./QuizOverlay";
import { SubtitleSwitcher } from "./SubtitleSwitcher";
import { Lesson, Quiz } from "@/types";

interface VideoPlayerProps {
  lesson: Lesson;
  quiz?: Quiz;
}

export function VideoPlayer({ lesson, quiz }: VideoPlayerProps) {
  const { 
    isPlaying, 
    setIsPlaying, 
    setCurrentTime, 
    setDuration, 
    language, 
    quizTriggered, 
    triggerQuiz 
  } = usePlayerStore();
  
  const plyrRef = useRef<any>(null);

  // Determine video source based on selected language
  const videoSrc = {
    EN: lesson.videoUrlEn,
    HI: lesson.videoUrlHi || lesson.videoUrlEn,
    TE: lesson.videoUrlTe || lesson.videoUrlEn,
  }[language];

  const videoSource: any = {
    type: "video",
    sources: [
      {
        src: videoSrc,
        provider: videoSrc.includes("youtube") ? "youtube" : "html5",
      },
    ],
  };

  useEffect(() => {
    if (!plyrRef.current) return;
    
    const player = plyrRef.current.plyr;
    
    player.on("timeupdate", () => {
      const currentTime = player.currentTime;
      setCurrentTime(currentTime);

      // Trigger quiz logic
      if (quiz && !quizTriggered && currentTime >= quiz.triggerTimestamp && currentTime < quiz.triggerTimestamp + 1) {
        player.pause();
        triggerQuiz(quiz.id);
      }
    });

    player.on("playing", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("ready", () => setDuration(player.duration));

  }, [quiz, quizTriggered, triggerQuiz, setCurrentTime, setIsPlaying, setDuration]);

  // Sync isPlaying state with player
  useEffect(() => {
    if (!plyrRef.current) return;
    const player = plyrRef.current.plyr;
    if (isPlaying && player.paused) player.play();
    if (!isPlaying && !player.paused) player.pause();
  }, [isPlaying]);

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group">
      <Plyr
        ref={plyrRef}
        source={videoSource}
        options={{
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "settings",
            "fullscreen",
          ],
        }}
      />

      {/* Language / Subtitle Switcher Overlay (Absolute top right) */}
      <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
        <SubtitleSwitcher />
      </div>

      {/* Quiz Overlay */}
      {quizTriggered && quiz && (
        <QuizOverlay quiz={quiz} />
      )}
    </div>
  );
}
