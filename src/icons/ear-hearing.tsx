"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const EarHearing = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = 'pulse',
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
      <motion.path d="M9 4a5 5 0 0 1 5 5v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v4a2 2 0 0 0 2 2h1" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M18 6c.5.5.9 1.2.9 2" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M20 4c1.3 1.3 2 3.1 2 5" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M16 8c.3.3.5.7.5 1" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
