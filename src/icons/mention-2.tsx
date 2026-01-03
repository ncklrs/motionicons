"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const Mention2 = ({
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
      <motion.circle
        cx="12"
        cy="12"
        r="4"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      <motion.path
        d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
    </motion.svg>
  )
}
