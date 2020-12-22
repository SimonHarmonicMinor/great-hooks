import { renderHook } from '@testing-library/react-hooks'
import { useEffectOnce } from '../useEffectOnce'

describe("Test scenarios for 'useEffectOnce' hook", () => {
  it('Should call effect once', () => {
    const onMount = jest.fn()
    const onUnmount = jest.fn()
    const { unmount } = renderHook(() =>
      useEffectOnce(() => {
        onMount()
        return () => onUnmount()
      })
    )
    unmount()
    expect(onMount).toHaveBeenCalledTimes(1)
    expect(onUnmount).toHaveBeenCalledTimes(1)
  })

  it('Updates should not trigger the hook', () => {
    const callback = jest.fn()
    const { rerender } = renderHook(() => useEffectOnce(() => callback()))
    rerender()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
