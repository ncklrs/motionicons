"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLivelyAnimation } from "@/hooks/use-lively-animation";
import type { LivelyIconProps } from "@/lib/lively-types";

const GoogleCloud = React.forwardRef<SVGSVGElement, LivelyIconProps>(
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
        {/* Hexagonal cloud shape */}
      <motion.path
        d="M12 3 L17 6 L19 10 L17 14 L12 17 L7 14 L5 10 L7 6 Z"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      {/* Inner hexagon detail */}
      <motion.path
        d="M12 7 L15 9 L15 12 L12 14 L9 12 L9 9 Z"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      {/* Cloud element */}
      <motion.path
        d="M8 19 Q6 19 6 21 L18 21 Q18 19 16 19"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      </motion.svg>
    );
  }
);

GoogleCloud.displayName = "GoogleCloud";

export { GoogleCloud };
