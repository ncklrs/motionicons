"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Lively = ({
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

  const useCssDraw = isDraw && trigger === 'hover'
  const useMotionDraw = isDraw && trigger !== 'hover'
  const drawClass = useCssDraw ? 'draw-animation' : ''

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
      className={`${className || ''} ${drawClass}`.trim()}
      {...(!isDraw ? animationProps : useCssDraw ? drawWrapperProps : {})}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {/* Main vine stem - curved growth shape */}
      <motion.path
        d="M7 18 C7 13, 7 10, 10 7 C12 5, 14 5, 17 6"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      {/* Tendril curl */}
      <motion.path
        d="M17 6 C18 4, 20 4, 20 6"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      {/* Primary leaf */}
      <motion.path
        d="M13 8 C15 5, 19 6, 18 10 C17 12, 14 11, 13 8"
        fill="currentColor"
        stroke="none"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      {/* Secondary leaf */}
      <motion.path
        d="M9 13 C7 11, 8 9, 11 10 C12 11, 11 13, 9 13"
        fill="currentColor"
        stroke="none"
        opacity={0.8}
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      {/* Growth bud */}
      <motion.circle
        cx="7"
        cy="18"
        r="1.5"
        fill="currentColor"
        stroke="none"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
    </motion.svg>
  )
}
