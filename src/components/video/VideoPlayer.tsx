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

  let finalSrc = videoSrc;
  let provider = "html5";

  if (videoSrc.includes("youtube") || videoSrc.includes("youtu.be")) {
    provider = "youtube";
    const match = videoSrc.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (match && match[1]) {
      finalSrc = match[1];
    }
  }

  const videoSource: any = {
    type: "video",
    sources: [
      {
        src: finalSrc,
        provider: provider,
      },
    ],
  };

  useEffect(() => {
    const player = plyrRef.current?.plyr;
    if (!player) return;
    
    const bindEvent = (event: string, callback: any) => {
      if (typeof player.on === "function") {
        player.on(event, callback);
      } else if (typeof player.addEventListener === "function") {
        player.addEventListener(event, callback);
      }
    };
    
    bindEvent("timeupdate", () => {
      const currentTime = player.currentTime || 0;
      setCurrentTime(currentTime);

      // Trigger quiz logic
      if (quiz && !quizTriggered && currentTime >= quiz.triggerTimestamp && currentTime < quiz.triggerTimestamp + 1) {
        if (typeof player.pause === "function") player.pause();
        triggerQuiz(quiz.id);
      }
    });

    bindEvent("playing", () => setIsPlaying(true));
    bindEvent("pause", () => setIsPlaying(false));
    bindEvent("ready", () => setDuration(player.duration || 0));

  }, [quiz, quizTriggered, triggerQuiz, setCurrentTime, setIsPlaying, setDuration]);

  // Sync isPlaying state with player
  useEffect(() => {
    const player = plyrRef.current?.plyr;
    if (!player || typeof player.pause !== "function" || typeof player.play !== "function") return;
    
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
          markers: quiz ? {
            enabled: true,
            points: [
              { time: quiz.triggerTimestamp, label: "Quiz Checkpoint" }
            ]
          } : undefined
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
