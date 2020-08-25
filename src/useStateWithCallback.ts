import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

export function useStateWithCallback<T>(
  initialState: T
): [T, SetStateWithCallback<T>] {
  const [state, setState] = useState(initialState)
  const callbackRef = useRef<SetStateCallback<T> | undefined>(undefined)

  const setStateWithCallback: SetStateWithCallback<T> = useCallback(
    (setStateAction: SetStateAction<T>, callback?: SetStateCallback<T>) => {
      callbackRef.current = callback
      setState(setStateAction)
    },
    []
  )

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state)
      callbackRef.current = undefined
    }
  }, [state])

  return [state, setStateWithCallback]
}

export type SetStateWithCallback<T> = {
  (setStateAction: SetStateAction<T>, callback?: SetStateCallback<T>): void
}

export type SetStateCallback<T> = {
  (state: T): any
}
