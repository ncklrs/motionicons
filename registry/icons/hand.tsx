"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLivelyAnimation } from "@/hooks/use-lively-animation";
import type { LivelyIconProps } from "@/lib/lively-types";

const Hand = React.forwardRef<SVGSVGElement, LivelyIconProps>(
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
        <motion.path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      </motion.svg>
    );
  }
);

Hand.displayName = "Hand";

export { Hand };
