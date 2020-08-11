import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

function useAutoUpdateRef<T>(value: T): MutableRefObject<T> {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

export { useAutoUpdateRef }
