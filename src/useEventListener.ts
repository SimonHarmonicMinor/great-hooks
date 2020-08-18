import { useAutoUpdateRef } from './useAutoUpdateRef'
import { useEffect } from 'react'

type UseEventListenerParams = {
  eventName: string
  onEventTriggered: (event: Event) => any
  element: EventTarget
}

function useEventListener({
  eventName,
  onEventTriggered,
  element
}: UseEventListenerParams) {
  const savedEventCallback = useAutoUpdateRef<(event: Event) => any>(
    onEventTriggered
  )
  useEffect(() => {
    const eventListener = (event: Event) => savedEventCallback.current(event)
    element.addEventListener(eventName, eventListener)
    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

export { useEventListener }
export type { UseEventListenerParams }
