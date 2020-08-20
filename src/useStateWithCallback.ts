import { SetStateAction, useEffect, useRef, useState } from 'react'

function useStateWithCallback<T>(initialState: T) {
  const [state, setState] = useState(initialState)
  const callbackRef = useRef<SetStateCallback<T> | null>(null)

  const setStateWithCallback = (
    setStateAction: SetStateAction<T>,
    callback: SetStateCallback<T>
  ) => {
    callbackRef.current = callback
    setState(setStateAction)
  }

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state)
      callbackRef.current = null
    }
  }, [state])

  return [state, setStateWithCallback]
}

type SetStateCallback<T> = {
  (state: T): any
}

export { useStateWithCallback }
