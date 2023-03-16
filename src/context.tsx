import { createContext, useContext } from 'solid-js'
import { Translate, SetI18n } from 'i18n-pro'

let count = 0

const t: Translate = (t) => {
  if (count === 0) {
    console.warn('useI18n should be wrapped by Provider')
    count++
  }
  return t
}
const setI18n: SetI18n = (res) => {
  return { ...res, namespace: 'unknown' }
}
const defaultContext: [Translate, SetI18n] = [t, setI18n]

const i18nContext = createContext(defaultContext)

export const InnerProvider = i18nContext.Provider

export function useI18n() {
  return useContext(i18nContext)
}
