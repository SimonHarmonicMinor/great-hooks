import { renderHook, RenderHookResult } from '@testing-library/react-hooks'
import {
  useEventListener,
  UseEventListenerParams,
  EventTarget
} from '../useEventListener'

describe("Test scenarios for 'useEventListener' hook", () => {
  it('Mount and unmount works consistently', () => {
    const params = {
      eventName: 'click',
      eventTarget: new MockEventTarget(),
      onEventTriggered: jest.fn()
    }
    const { unmount } = renderUseEventListener(params)
    unmount()
    expectConsistentHookFlushing({
      ...params,
      expectedCalls: 1
    })
  })

  it("The 'callback' is being called as expected", () => {
    const params = {
      eventName: 'keydown',
      onEventTriggered: jest.fn(),
      eventTarget: new MockEventTarget()
    }
    renderUseEventListener(params)
    const event1 = {} as Event
    const event2 = {} as Event
    params.eventTarget.fireEvent(params.eventName, event1)
    params.eventTarget.fireEvent(params.eventName, event2)

    expect(params.onEventTriggered).toHaveBeenCalledTimes(2)
    expect(params.onEventTriggered).toHaveBeenCalledWith(event1)
    expect(params.onEventTriggered).toHaveBeenCalledWith(event2)
  })

  it("The 'callback' changes does not trigger rerender", () => {
    const params = {
      eventName: 'keydown',
      onEventTriggered: jest.fn(),
      eventTarget: new MockEventTarget()
    }
    const { rerender, unmount } = renderUseEventListener(params)
    const event = {} as Event
    params.eventTarget.fireEvent(params.eventName, event)
    expect(params.onEventTriggered).toHaveBeenCalledTimes(1)
    expect(params.onEventTriggered).toHaveBeenCalledWith(event)

    params.onEventTriggered = jest.fn()
    rerender()

    params.eventTarget.fireEvent(params.eventName, event)
    expect(params.onEventTriggered).toHaveBeenCalledTimes(1)
    expect(params.onEventTriggered).toHaveBeenCalledWith(event)

    unmount()
    expectConsistentHookFlushing({ ...params, expectedCalls: 1 })
  })

  it("The 'eventName' changes triggers rerender", () => {
    const params = {
      eventName: 'keyup',
      onEventTriggered: jest.fn(),
      eventTarget: new MockEventTarget()
    }
    const { rerender, unmount } = renderUseEventListener(params)
    params.eventName = 'keydown'
    rerender()

    unmount()
    const eventNames = ['keyup', 'keydown']
    eventNames.forEach((eventName) => {
      expectConsistentHookFlushing({
        ...params,
        eventName,
        expectedCalls: 2
      })
    })
  })

  it("The 'eventTarget' changes triggers rerender", () => {
    const eventTarget1 = new MockEventTarget()
    const eventTarget2 = new MockEventTarget()
    const params = {
      eventName: 'keydown',
      onEventTriggered: jest.fn(),
      eventTarget: eventTarget1
    }
    const { rerender, unmount } = renderUseEventListener(params)
    params.eventTarget = eventTarget2
    rerender()

    unmount()
    const eventTargets = [eventTarget1, eventTarget2]
    eventTargets.forEach((eventTarget) => {
      expectConsistentHookFlushing({ ...params, eventTarget, expectedCalls: 1 })
    })
  })

  it('If no params has been changed, then manual rerender does not trigger updates', () => {
    const params = {
      eventName: 'click',
      onEventTriggered: jest.fn(),
      eventTarget: new MockEventTarget()
    }
    const { rerender, unmount } = renderUseEventListener(params)
    rerender()
    rerender()
    rerender()

    unmount()
    expectConsistentHookFlushing({ ...params, expectedCalls: 1 })
  })
})

function renderUseEventListener(
  params: UseEventListenerParams
): RenderHookResult<unknown, void> {
  return renderHook(() => useEventListener(params))
}

function expectConsistentHookFlushing(params: {
  eventTarget: EventTarget
  eventName: string
  expectedCalls: number
}) {
  expect(params.eventTarget.addEventListener).toHaveBeenCalledTimes(
    params.expectedCalls
  )
  expect(params.eventTarget.addEventListener).toHaveBeenCalledWith(
    params.eventName,
    expect.any(Function)
  )
  expect(params.eventTarget.removeEventListener).toHaveBeenCalledTimes(
    params.expectedCalls
  )
  expect(params.eventTarget.removeEventListener).toHaveBeenCalledWith(
    params.eventName,
    expect.any(Function)
  )
}

class MockEventTarget implements EventTarget {
  events = new Map<string, EventListenerOrEventListenerObject>()

  addEventListener = jest.fn(
    (type: string, listener: EventListenerOrEventListenerObject) => {
      this.events.set(type, listener)
    }
  )

  removeEventListener = jest.fn((type: string) => {
    this.events.delete(type)
  })

  fireEvent = (type: string, event: Event) => {
    // @ts-ignore
    this.events.get(type)(event)
  }
}
