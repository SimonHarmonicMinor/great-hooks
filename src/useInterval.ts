import { useEffect, useRef } from 'react'
import { useAutoUpdateRef } from './useAutoUpdateRef'

type UseIntervalParams = {
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
function useInterval({ callback, interval, delay }: UseIntervalParams) {
  if (interval < 0 || (delay ?? 0) < 0) {
    throw new RangeError(
      `"interval" and "delay" parameters should be non-negative. Given: [interval=${interval}, delay=${delay}]`
    )
  }
  const savedCallback = useAutoUpdateRef<() => any>(callback)
  const savedTimerId = useRef<NodeJS.Timeout>()

  useEffect(() => {
    let delayedTimerId: NodeJS.Timeout
    if (!delay) {
      callInLoop()
    } else {
      delayedTimerId = setTimeout(callInLoop, delay)
    }
    return () => {
      // @ts-ignore
      clearTimeout(savedTimerId.current)
      if (delayedTimerId) {
        clearTimeout(delayedTimerId)
      }
    }
  }, [interval, delay])

  function callInLoop() {
    savedCallback.current()
    const nextIteration = () => {
      savedTimerId.current = setTimeout(callInLoop, interval)
    }
    nextIteration()
  }
}

export { useInterval }
export type { UseIntervalParams }
