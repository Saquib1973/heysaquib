"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CipherTextProps {
  text: string;
  className?: string;
  interval?: number; // Speed of the scrambling
  delay?: number;    // Delay before starting
}

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789";

export default function CipherText({ 
  text, 
  className,
  interval = 50,
  delay = 0 
}: CipherTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  // Only trigger when in view, similar to your flag animation
  const isInView = useInView(elementRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let timer: NodeJS.Timeout;
    let iteration = 0;

    // Optional initial delay
    const startDelay = setTimeout(() => {
      setIsAnimating(true);
      
      timer = setInterval(() => {
        setDisplayText((prev) => 
          text
            .split("")
            .map((letter, index) => {
              // If we've passed this index, show the real letter
              if (index < iteration) {
                return text[index];
              }
              // Otherwise, show a random character
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        // Control the speed of the reveal
        // Increasing iteration by a fraction makes it look more "scrambled" for longer
        if (iteration >= text.length) {
          clearInterval(timer);
          setIsAnimating(false);
        }

        iteration += 1 / 3; // Change 1/3 to 1/2 or 1 for faster resolve
      }, interval);

    }, delay);

    return () => {
      clearTimeout(startDelay);
      clearInterval(timer);
    };
  }, [text, interval, delay, isInView]);

  return (
    <motion.span
      ref={elementRef}
      className={cn("inline-block font-mono", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText || text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")}
      {/* Optional: Add a blinking cursor while animating */}
      {isAnimating && <span className="text-emerald-500 animate-pulse">_</span>}
    </motion.span>
  );
}