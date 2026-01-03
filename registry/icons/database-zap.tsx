"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLivelyAnimation } from "@/hooks/use-lively-animation";
import type { LivelyIconProps } from "@/lib/lively-types";

const DatabaseZap = React.forwardRef<SVGSVGElement, LivelyIconProps>(
  (
    {
      size,
      strokeWidth,
      className,
      animated,
      lively = "scale",
      trigger = "hover",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const { animationProps, pathAnimationProps, drawWrapperProps } =
      useLivelyAnimation(animated, lively, trigger);
    const isDraw = lively === "draw";

    const iconSize = size ?? "var(--lively-icon-size, 24)";
    const iconStrokeWidth = strokeWidth ?? "var(--lively-stroke-width, 2)";

    return (
      <motion.svg
        ref={ref}
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={iconStrokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("lively-icon", isDraw && "draw-animation", className)}
        {...(!isDraw ? animationProps : drawWrapperProps)}
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        {...props}
      >
        <motion.ellipse cx="12" cy="5" rx="9" ry="3" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M3 5v14c0 1.66 4.03 3 9 3" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M3 12c0 1.66 4.03 3 9 3" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M21 12c0 1.66-4.03 3-9 3" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M21 5v7" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.polygon points="19 13 15 19 18 19 17 23 21 17 18 17 19 13" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      </motion.svg>
    );
  }
);

DatabaseZap.displayName = "DatabaseZap";

export { DatabaseZap };
