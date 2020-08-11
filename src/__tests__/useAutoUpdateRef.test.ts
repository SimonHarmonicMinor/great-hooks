import { renderHook } from '@testing-library/react-hooks'
import { useAutoUpdateRef } from '../useAutoUpdateRef'

describe("Test scenarios for 'useAutoUpdateRef' hook", () => {
  it('Should return a ref with the given value', () => {
    const value: number = 12
    const { result } = renderHook(() => useAutoUpdateRef(value))
    expect(result.current.current).toBe(value)
  })

  it('Should update the given value automatically', () => {
    let value: string = 'Hello there'
    const { result, rerender } = renderHook(() => useAutoUpdateRef(value))
    expect(result.current.current).toBe(value)

    value = 'General Kenobi'
    rerender()
    expect(result.current.current).toBe(value)
  })
})
