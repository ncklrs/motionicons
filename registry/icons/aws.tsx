"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLivelyAnimation } from "@/hooks/use-lively-animation";
import type { LivelyIconProps } from "@/lib/lively-types";

const Aws = React.forwardRef<SVGSVGElement, LivelyIconProps>(
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
        {/* AWS smile/swoosh arrow */}
      <motion.path
        d="M3 14 Q12 18 21 14"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      <motion.path
        d="M21 14 L18 12 M21 14 L18 16"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      {/* Letter blocks */}
      <motion.path
        d="M4 6 L6 12 L8 6 M5 9 L7 9"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      <motion.path
        d="M10 6 L10 12 M10 6 L12 12 M12 6 L12 12 M14 6 L16 9 M16 9 L14 12"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      </motion.svg>
    );
  }
);

Aws.displayName = "Aws";

export { Aws };
