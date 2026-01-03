"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const PiggyBank = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = 'bounce',
  trigger = 'hover',
  'aria-label': ariaLabel
}: IconProps) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger)
  const isDraw = motionType === 'draw'

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
      <motion.path d="M19 9c0-3.3-2.7-6-6-6H9C5.7 3 3 5.7 3 9v6c0 1.7 1.3 3 3 3h2m14-8c0 1.1-.9 2-2 2h-1" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M10 18v3M14 18v3" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M12 6v3M15 9h.01" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
