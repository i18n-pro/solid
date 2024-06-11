import { createSignal, type ParentProps, splitProps } from 'solid-js'
import { initI18n, Translate } from 'i18n-pro'
import type { I18nState, SetI18n } from 'i18n-pro'
import { InnerProvider } from './context'

export default function Provider(props: ParentProps<I18nState>) {
  const [local, i18nStateProp] = splitProps(props, ['children'])
  const { t: originT, setI18n: originSetI18n } = initI18n(i18nStateProp)
  const [i18nState, setI18nState] = createSignal(i18nStateProp)
  const [reactiveT, setReactiveT] = createSignal(originT)

  const setI18n: SetI18n = (args) => {
    const newState = originSetI18n(args)
    setReactiveT(() => originT.bind(null))
    setI18nState(newState)
    return newState
  }

  const t: Translate = (
    text: string,
    ...args: Array<string | number | unknown>
  ) => {
    return reactiveT()(text, ...args)
  }

  const value = {
    t,
    setI18n,
    i18nState,
  }

  return <InnerProvider value={value}>{local.children}</InnerProvider>
}
