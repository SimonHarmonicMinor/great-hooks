import { SetStateAction, useCallback } from 'react'
import { useStateWithCallback } from './useStateWithCallback'

export function useStateWithPromise<T>(
  initialState: T
): [T, SetStateWithPromise<T>] {
  const [state, setStateWithCallback] = useStateWithCallback(initialState)
  const setStateWithPromise = useCallback(
    (setStateAction: SetStateAction<T>) =>
      new Promise<T>((resolve) =>
        setStateWithCallback(setStateAction, resolve)
      ),
    [setStateWithCallback]
  )
  return [state, setStateWithPromise]
}

export type SetStateWithPromise<T> = {
  (setStateAction: SetStateAction<T>): Promise<T>
}
