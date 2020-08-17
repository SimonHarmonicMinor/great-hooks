import { renderHook } from '@testing-library/react-hooks'
import { useInterval } from '../useInterval'

describe("Test scenarios for 'useInterval' hook", () => {
  it("Should throw 'RangeError' if 'interval' is less than 0", () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useInterval({ callback, interval: -1 }))
    expect(result.error).toBeInstanceOf(RangeError)
  })

  it("Should throw 'RangeError' if 'delay' is less than 0", () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useInterval({ callback, interval: 1000, delay: -20 })
    )
    expect(result.error).toBeInstanceOf(RangeError)
  })

  it("Should call 'callback' once", () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    const interval = 10000
    renderHook(() => useInterval({ callback, interval }))
    expect(callback).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), interval)
  })

  it('Should be called with delay', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    const interval = 5000
    const delay = 600
    renderHook(() => useInterval({ callback, interval, delay }))
    expect(callback).toHaveBeenCalledTimes(0)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), delay)
  })
})
