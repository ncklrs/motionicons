"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLivelyAnimation } from "@/hooks/use-lively-animation";
import type { LivelyIconProps } from "@/lib/lively-types";

const Cave = React.forwardRef<SVGSVGElement, LivelyIconProps>(
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
        <motion.path d="M2 20C2 20 4 10 12 10C20 10 22 20 22 20" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M7 20C7 17 9 14 12 14C15 14 17 17 17 20" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M9 6L10 10" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M15 6L14 10" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      </motion.svg>
    );
  }
);

Cave.displayName = "Cave";

export { Cave };
