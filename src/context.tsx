import { type I18nState } from 'i18n-pro'
import { createContext, createSignal, useContext } from 'solid-js'

const DEFAULT_NAMESPACE = 'unknown'

const [i18nState] = createSignal({
  namespace: DEFAULT_NAMESPACE,
} as I18nState)

const I18nContext = createContext({
  t: (t: string) => t,
  setI18n: (res: Pick<I18nState, 'locale' | 'langs'>) => ({
    namespace: DEFAULT_NAMESPACE,
    ...res,
  }),
  i18nState,
})

export const InnerProvider = I18nContext.Provider

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n: cannot find a I18nContext')
  }
  return context
}
