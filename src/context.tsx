import { createContext, useContext, createSignal } from 'solid-js'
import { Translate, SetI18n, I18nState } from 'i18n-pro'

let warned = false

const t: Translate = (t) => {
  if (!warned) {
    console.warn('useI18n should be wrapped by Provider')
    warned = true
  }
  return t
}

const setI18n: SetI18n = (res) => {
  return { ...res, namespace: 'unknown' }
}

const [i18nState] = createSignal({
  namespace: 'unknown',
} as I18nState)

const defaultContext = {
  t,
  setI18n,
  i18nState,
}

const i18nContext = createContext(defaultContext)

export const InnerProvider = i18nContext.Provider

export function useI18n() {
  return useContext(i18nContext)
}
