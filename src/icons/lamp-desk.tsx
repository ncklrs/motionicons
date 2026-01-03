"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const LampDesk = ({
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
      <motion.path d="m14 5-3 3 2 7 8-8-7-2Z" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="m14 5-3 3-3-3 3-3 3 3Z" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M9.5 6.5 4 12l3 6" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
