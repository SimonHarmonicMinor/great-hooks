import { EffectCallback, useEffect } from 'react'

export function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line
  useEffect(effect, []);
}
