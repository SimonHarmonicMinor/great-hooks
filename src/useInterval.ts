import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

interface UseIntervalParams {
  callback: (() => Promise<any>) | (() => any)
  interval: number
  delay: number | undefined | null
}

function useInterval({ callback, interval, delay }: UseIntervalParams) {
  if (interval < 0 || (delay ?? 0) < 0) {
    throw new RangeError(
      `"interval" and "delay" parameters should be non-negative. Given: [interval=${interval}, delay=${delay}]`
    )
  }
  // @ts-ignore
  const savedTimerId: MutableRefObject<NodeJS.Timeout> = useRef()

  useEffect(() => {
    const loop = () => {
      const res = callback()
      const nextIteration = () => {
        savedTimerId.current = setTimeout(loop, interval)
      }
      if (res instanceof Promise) {
        res.then(nextIteration)
      } else {
        nextIteration()
      }
    }
    let delayedTimerId: NodeJS.Timeout
    if (!delay) {
      loop()
    } else {
      delayedTimerId = setTimeout(loop, delay)
    }
    return () => {
      clearTimeout(savedTimerId.current)
      if (delayedTimerId) {
        clearTimeout(delayedTimerId)
      }
    }
  }, [callback, interval, delay])
}

export { useInterval }
export type { UseIntervalParams }
