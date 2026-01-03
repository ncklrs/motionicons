"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Snapchat = ({
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
      {/* Ghost body */}
      <motion.path d="M12 2C8.5 2 6 4.5 6 8v2c-1 0-2 .5-2 1.5S5 13 6 13c-.5 1.5-2 2.5-3 3 0 1 1 1.5 2.5 1.5.5 1 1 2.5 2 2.5s2-.5 2.5-.5c.5 0 1 .5 2 .5s1.5-1.5 2-2.5c1.5 0 2.5-.5 2.5-1.5-1-.5-2.5-1.5-3-3 1 0 2-.5 2-1.5S19 10 18 10V8c0-3.5-2.5-6-6-6Z" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      {/* Left ear */}
      <motion.path d="M8 7c-1-.5-2 0-2.5 1" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      {/* Right ear */}
      <motion.path d="M16 7c1-.5 2 0 2.5 1" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
