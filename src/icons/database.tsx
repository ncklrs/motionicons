"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Database = ({
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
      <motion.ellipse cx="12" cy="5" rx="9" ry="3" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M3 5v14a9 3 0 0 0 18 0V5" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M3 12a9 3 0 0 0 18 0" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
