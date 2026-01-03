"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Aws = ({
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
      {/* AWS smile/swoosh arrow */}
      <motion.path
        d="M3 14 Q12 18 21 14"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      <motion.path
        d="M21 14 L18 12 M21 14 L18 16"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      {/* Letter blocks */}
      <motion.path
        d="M4 6 L6 12 L8 6 M5 9 L7 9"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
      <motion.path
        d="M10 6 L10 12 M10 6 L12 12 M12 6 L12 12 M14 6 L16 9 M16 9 L14 12"
        {...(isDraw ? pathAnimationProps : {})}
        pathLength={1}
        className={isDraw ? 'draw-path' : ''}
      />
    </motion.svg>
  )
}
