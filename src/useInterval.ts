import { useCallback, useEffect, useRef } from 'react'
import { useAutoUpdateRef } from './useAutoUpdateRef'

export interface UseIntervalParams {
  callback: () => any
  interval: number
  delay?: number
}

/**
 * Invokes the callback in a loop with a given interval.<br>
 *
 * @param callback The function that has to be called.<br>
 *
 * @param interval The interval in milliseconds.<br>
 *
 * @param delay The optional initial delay in milliseconds.
 * If it has been set, then the first invocation shall be delayed.<br>
 *
 * @throws RangeError if <code>interval</code> or <code>delay</code> is less than 0
 */
export function useInterval({ callback, interval, delay }: UseIntervalParams) {
  if (interval < 0 || (delay ?? 0) < 0) {
    throw new RangeError(
      `"interval" and "delay" parameters should be non-negative. Given: [interval=${interval}, delay=${delay}]`
    )
  }
  const savedCallback = useAutoUpdateRef<() => any>(callback)
  const savedInterval = useAutoUpdateRef<number>(interval)
  const savedDelay = useAutoUpdateRef<number | undefined>(delay)

  const savedTimerId = useRef<NodeJS.Timeout>()

  const callInLoop = useCallback(() => {
    savedCallback.current()
    const nextIteration = () =>
      (savedTimerId.current = setTimeout(callInLoop, savedInterval.current))
    nextIteration()
  }, [savedCallback, savedInterval])

  useEffect(() => {
    let delayedTimerId: NodeJS.Timeout
    if (!savedDelay.current) {
      callInLoop()
    } else {
      delayedTimerId = setTimeout(callInLoop, savedDelay.current)
    }
    return () => {
      if (savedTimerId.current) {
        clearTimeout(savedTimerId.current)
      }
      if (delayedTimerId) {
        clearTimeout(delayedTimerId)
      }
    }
  }, [callInLoop, savedTimerId, savedDelay])
}
