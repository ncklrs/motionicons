"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const ChevronsRight = ({
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
      <motion.polyline points="13 17 18 12 13 7" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.polyline points="6 17 11 12 6 7" {...(isDraw ? pathAnimationProps : {})}  pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
