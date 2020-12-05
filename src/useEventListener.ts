import { useAutoUpdateRef } from './useAutoUpdateRef'
import { useEffect } from 'react'

function useEventListener({
  eventName,
  onEventTriggered,
  eventTarget
}: UseEventListenerParams) {
  const savedEventCallback = useAutoUpdateRef<EventListener>(onEventTriggered)
  useEffect(() => {
    const eventListener = (event: Event) => savedEventCallback.current(event)
    eventTarget.addEventListener(eventName, eventListener)
    return () => {
      eventTarget.removeEventListener(eventName, eventListener)
    }
  }, [eventName, eventTarget, savedEventCallback])
}

interface UseEventListenerParams {
  eventName: string
  onEventTriggered: EventListener
  eventTarget: EventTarget
}

interface EventListener {
  (event: Event): any
}

interface EventTarget {
  addEventListener: (type: string, eventListener: EventListener) => any
  removeEventListener: (type: string, eventListener: EventListener) => any
}

export { useEventListener }
export type { UseEventListenerParams, EventListener, EventTarget }
