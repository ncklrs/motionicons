"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const BrainCog = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  lively = 'rotate',
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
      <motion.path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.5.5 2.5.5 4C8 12 6.5 13 6.5 15c0 2 1.5 3.5 3.5 3.5h1" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M16.5 6.5c0-1.5-.5-2.5-.5-4C16 4 14.5 2 12 2" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M16 22c-1.66 0-3-1.34-3-3 0-.33.06-.65.16-.95l-1.65-.95 1.5-2.6 1.65.95a3 3 0 0 1 2.68 0l1.65-.95 1.5 2.6-1.65.95c.1.3.16.62.16.95 0 1.66-1.34 3-3 3Z" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M16 20.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
