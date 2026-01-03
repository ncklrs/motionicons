"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const LiveStream = ({
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
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      <motion.path
        d="M4.93 4.93a10 10 0 0 0 0 14.14"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      <motion.path
        d="M19.07 4.93a10 10 0 0 1 0 14.14"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      <motion.path
        d="M7.76 7.76a6 6 0 0 0 0 8.48"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      <motion.path
        d="M16.24 7.76a6 6 0 0 1 0 8.48"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
    </motion.svg>
  )
}
