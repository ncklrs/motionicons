"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const CloudSnow = ({
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
      <motion.path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M8 15h.01" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M8 19h.01" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M12 17h.01" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M12 21h.01" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M16 15h.01" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M16 19h.01" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
