"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const GoogleCloud = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  lively = 'scale',
  trigger = 'hover',
  'aria-label': ariaLabel
}: IconProps) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, lively, trigger)
  const isDraw = lively === 'draw'

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className || ''} ${isDraw ? 'draw-animation' : ''}`.trim()}
      {...(!isDraw ? animationProps : drawWrapperProps)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
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
  )
}
