"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Verified2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  lively = 'pulse',
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
      <motion.path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      <motion.path
        d="m9 12 2 2 4-4"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
    </motion.svg>
  )
}
