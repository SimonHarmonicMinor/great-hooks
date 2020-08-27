import { act, renderHook } from '@testing-library/react-hooks'
import { useStateWithPromise } from '../useStateWithPromise'

describe("Test scenarios for 'useStateWithPromise' hook", () => {
  it("'setState' acts properly", () => {
    const { result } = renderHook(() => useStateWithPromise('str1'))
    expect(result.current[0]).toBe('str1')
    act(() => {
      result.current[1]('str2')
    })
    expect(result.current[0]).toBe('str2')
  })

  it("'setState' promise executes after the state has been placed", () => {
    const { result } = renderHook(() => useStateWithPromise(1))
    const mockFn = jest.fn()
    act(() => {
      result.current[1](() => {
        mockFn('before')
        return 2
      }).then(() => {
        expect(result.current[0]).toBe(2)
        mockFn('after')
        expect(mockFn).toHaveBeenCalledTimes(2)
        expect(mockFn).toHaveBeenNthCalledWith(1, 'before')
        expect(mockFn).toHaveBeenNthCalledWith(2, 'after')
      })
    })
  })

  it("Re-renders does not trigger 'setStateWithPromise' change", () => {
    const initialState: number = 1
    const { result, rerender } = renderHook(() =>
      useStateWithPromise(initialState)
    )
    const [state, setStateWithPromise] = result.current
    rerender()
    const [newState, newSetStateWithPromise] = result.current

    expect(state).toEqual(1)
    expect(newState).toEqual(1)
    expect(setStateWithPromise).toStrictEqual(newSetStateWithPromise)
  })
})
