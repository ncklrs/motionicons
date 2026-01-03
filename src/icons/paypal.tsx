"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Paypal = ({
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
      {/* First P shape */}
      <motion.path
        d="M6 4 L6 20 M6 4 L11 4 Q14 4 14 8 Q14 12 11 12 L6 12"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      {/* Second overlapping P shape */}
      <motion.path
        d="M10 6 L10 22 M10 6 L15 6 Q18 6 18 10 Q18 14 15 14 L10 14"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
    </motion.svg>
  )
}
