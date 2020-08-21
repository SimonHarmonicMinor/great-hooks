import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

function useStateWithCallback<T>(initialState: T): [T, SetState<T>] {
  const [state, setState] = useState(initialState)
  const callbackRef = useRef<SetStateCallback<T> | undefined>(undefined)

  const setStateWithCallback: SetState<T> = useCallback(
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

type SetState<T> = {
  (setStateAction: SetStateAction<T>, callback?: SetStateCallback<T>): void
}

type SetStateCallback<T> = {
  (state: T): any
}

export { useStateWithCallback }
