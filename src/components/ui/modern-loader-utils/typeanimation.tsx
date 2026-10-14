import React, { useState, useEffect } from "react";

interface TypeAnimationProps {
  words: string[];
  typingSpeed?: "slow" | "medium" | "fast" | number;
  deletingSpeed?: "slow" | "medium" | "fast" | number;
  pauseDuration?: number;
  className?: string;
}

const speedMap = {
  slow: 120,
  medium: 70,
  fast: 35,
};

const TypeAnimation: React.FC<TypeAnimationProps> = ({
  words = [],
  typingSpeed = "slow",
  deletingSpeed = "slow",
  pauseDuration = 2000,
  className = "",
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const typeDelay = typeof typingSpeed === "number" ? typingSpeed : speedMap[typingSpeed] || 100;
  const deleteDelay = typeof deletingSpeed === "number" ? deletingSpeed : speedMap[deletingSpeed] || 50;

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[currentWordIndex % words.length];

    if (!isDeleting && currentText === currentWord) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );
    }, isDeleting ? deleteDelay : typeDelay);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typeDelay, deleteDelay, pauseDuration]);

  return <span className={className}>{currentText}</span>;
};

export default TypeAnimation;
