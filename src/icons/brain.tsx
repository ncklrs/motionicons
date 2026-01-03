"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Brain = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  lively = 'pulse',
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
      <motion.path d="M9.5 2C7 2 5 4 5 6.5c0 1.5.5 2.5.5 4C5.5 12 4 13 4 15c0 2 1.5 3.5 3.5 3.5 1 0 1.5-.5 2.5-.5s1.5.5 2.5.5c2 0 3.5-1.5 3.5-3.5 0-2-1.5-3-1.5-4.5 0-1.5.5-2.5.5-4C15 4 13 2 10.5 2" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M14.5 10.5c1-.5 2.5-.5 3.5.5 1.5 1.5 1.5 4 0 5.5-1 1-2.5 1-3.5.5" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M9.5 10.5c-1-.5-2.5-.5-3.5.5-1.5 1.5-1.5 4 0 5.5 1 1 2.5 1 3.5.5" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
