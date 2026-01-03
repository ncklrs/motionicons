"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Warehouse = ({
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
      <motion.path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M6 18h12" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M6 14h12" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.rect width="12" height="12" x="6" y="10" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
