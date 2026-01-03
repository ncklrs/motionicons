"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLivelyAnimation } from "@/hooks/use-lively-animation";
import type { LivelyIconProps } from "@/lib/lively-types";

const Scan = React.forwardRef<SVGSVGElement, LivelyIconProps>(
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
        <motion.path d="M3 7V5a2 2 0 0 1 2-2h2" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M17 3h2a2 2 0 0 1 2 2v2" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M21 17v2a2 2 0 0 1-2 2h-2" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M7 21H5a2 2 0 0 1-2-2v-2" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      </motion.svg>
    );
  }
);

Scan.displayName = "Scan";

export { Scan };
