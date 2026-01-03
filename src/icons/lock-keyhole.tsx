"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const LockKeyhole = ({
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
      <motion.rect x="5" y="11" width="14" height="10" rx="2" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M12 17 L12 17.01" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
      <motion.path d="M8 11 V7 A4 4 0 0 1 16 7 V11" {...(isDraw ? pathAnimationProps : {})} pathLength={1} className={isDraw ? 'draw-path' : ''}/>
    </motion.svg>
  )
}
