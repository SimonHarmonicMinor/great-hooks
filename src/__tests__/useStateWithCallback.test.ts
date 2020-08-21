import { act, renderHook } from '@testing-library/react-hooks'
import { useStateWithCallback } from '../useStateWithCallback'

describe("Test scenarios for 'useStateWithCallback' hook", () => {
  it("'setState' acts properly", () => {
    const { result } = renderHook(() => useStateWithCallback(1))
    expect(result.current[0]).toBe(1)
    act(() => {
      result.current[1](22)
    })
    expect(result.current[0]).toBe(22)
  })

  it("'setState' callback executes after the state has been placed", () => {
    const { result } = renderHook(() => useStateWithCallback('string1'))
    const mockFn = jest.fn()
    act(() => {
      result.current[1](
        () => {
          mockFn('before')
          return 'string2'
        },
        () => {
          expect(result.current[0]).toBe('string2')
          mockFn('after')
        }
      )
    })
    expect(mockFn).toHaveBeenCalledTimes(2)
    expect(mockFn).toHaveBeenNthCalledWith(1, 'before')
    expect(mockFn).toHaveBeenNthCalledWith(2, 'after')
  })
})
