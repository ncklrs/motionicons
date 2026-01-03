"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLivelyAnimation } from "@/hooks/use-lively-animation";
import type { LivelyIconProps } from "@/lib/lively-types";

const Ebay = React.forwardRef<SVGSVGElement, LivelyIconProps>(
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
        <motion.path d="M3 12h4c1.1 0 2 .9 2 2s-.9 2-2 2H4" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M10 8v8l3-4 3 4V8" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M3 8v8" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M17 12c0-1.5 1-2.5 2-2.5s2 1 2 2.5-1 2.5-2 2.5-2-1-2-2.5z" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      </motion.svg>
    );
  }
);

Ebay.displayName = "Ebay";

export { Ebay };
