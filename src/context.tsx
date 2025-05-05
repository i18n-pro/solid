import { createContext, useContext, createSignal } from 'solid-js'
import { Translate, SetI18n, I18nState } from 'i18n-pro'

const namespace = 'unknown'

const t: Translate = (t) => {
  return t
}

const setI18n: SetI18n = (res) => {
  return { ...res, namespace }
}

const [i18nState] = createSignal<I18nState>({
  namespace,
})

const defaultContext = {
  t,
  setI18n,
  i18nState,
}

const i18nContext = createContext(defaultContext)

export const InnerProvider = i18nContext.Provider

export function useI18n() {
  const context = useContext(i18nContext)

  if (context === defaultContext) {
    console.warn('useI18n should be wrapped by Provider')
  }

  return context
}
