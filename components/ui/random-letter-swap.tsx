"use client";

import React, { useState } from "react";
import { AnimationOptions, motion, useAnimate } from "motion/react";

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  options?: { leading?: boolean; trailing?: boolean }
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let leadingCalled = false;

  return (...args: Parameters<T>) => {
    if (options?.leading && !timer && !leadingCalled) {
      fn(...args);
      leadingCalled = true;
    }
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (options?.trailing && !leadingCalled) {
        fn(...args);
      }
      timer = null;
      leadingCalled = false;
    }, delay);
  };
}

export interface RandomLetterSwapProps {
  label: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  className?: string;
  onClick?: () => void;
}

export const RandomLetterSwap: React.FC<RandomLetterSwapProps> = ({
  label,
  reverse = true,
  transition = {
    type: "spring",
    stiffness: 380,
    damping: 24,
  },
  staggerDuration = 0.035,
  className = "",
  onClick,
  ...props
}) => {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);

  const mergeTransition = (trans: AnimationOptions, i: number) => ({
    ...trans,
    delay: i * staggerDuration,
  });

  const hoverStart = debounce(
    () => {
      if (blocked) return;
      setBlocked(true);

      const shuffledIndices = Array.from(
        { length: label.length },
        (_, i) => i
      ).sort(() => Math.random() - 0.5);

      const outY = reverse ? "110%" : "-110%";
      const inY = "0%";
      const resetSecondaryY = reverse ? "-110%" : "110%";

      let completedCount = 0;

      for (let i = 0; i < label.length; i++) {
        const randomIndex = shuffledIndices[i];
        const letterDelay = i * staggerDuration;

        animate(
          `.letter-primary-${randomIndex}`,
          { y: outY },
          mergeTransition(transition, i)
        );

        animate(
          `.letter-secondary-${randomIndex}`,
          { y: inY },
          mergeTransition(transition, i)
        ).then(() => {
          completedCount++;
          if (completedCount === label.length) {
            // Reset both to initial position seamlessly
            animate(`.letter-primary-${randomIndex}`, { y: "0%" }, { duration: 0 });
            animate(`.letter-secondary-${randomIndex}`, { y: resetSecondaryY }, { duration: 0 });

            for (let j = 0; j < label.length; j++) {
              animate(`.letter-primary-${j}`, { y: "0%" }, { duration: 0 });
              animate(`.letter-secondary-${j}`, { y: resetSecondaryY }, { duration: 0 });
            }
            setBlocked(false);
          }
        });
      }
    },
    80,
    { leading: true, trailing: true }
  );

  const initialSecondaryY = reverse ? "-110%" : "110%";

  return (
    <motion.span
      className={`inline-flex justify-center items-center relative overflow-hidden leading-none select-none ${className}`}
      onHoverStart={hoverStart}
      onMouseEnter={hoverStart}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split("").map((letter: string, i: number) => {
        return (
          <span
            className="whitespace-pre relative inline-flex overflow-hidden h-[1.35em] items-center justify-center"
            key={i}
            aria-hidden={true}
          >
            <motion.span
              className={`relative inline-block letter-primary-${i}`}
              style={{ transform: "translateY(0%)" }}
            >
              {letter}
            </motion.span>
            <motion.span
              className={`absolute inline-block letter-secondary-${i}`}
              style={{ transform: `translateY(${initialSecondaryY})` }}
            >
              {letter}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};

export default RandomLetterSwap;
