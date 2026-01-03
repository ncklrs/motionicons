"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Coins = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = 'scale',
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
      <motion.circle cx="8" cy="12" r="6" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M14 8c2.2 0 4 1.8 4 4s-1.8 4-4 4" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M18 6c3.3 0 6 2.7 6 6s-2.7 6-6 6" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
