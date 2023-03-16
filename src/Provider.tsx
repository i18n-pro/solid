import { createSignal } from 'solid-js'
import type { JSXElement } from 'solid-js'
import { initI18n, Translate } from 'i18n-pro'
import type { I18nState, SetI18n } from 'i18n-pro'
import { InnerProvider } from './context'

export interface ProviderProps extends I18nState {
  children: JSXElement
}

export default function Provider(props: ProviderProps) {
  // eslint-disable-next-line solid/reactivity, @typescript-eslint/no-unused-vars
  const { children, ...restProps } = props
  const { t: originT, setI18n: originSetI18n } = initI18n(restProps)
  const [reactiveT, setReactiveT] = createSignal(originT)

  const setI18n: SetI18n = (args) => {
    const newState = originSetI18n(args)
    setReactiveT(() => originT.bind(null))
    return newState
  }

  const t: Translate = (...args) => {
    return reactiveT()(...args)
  }

  const value: [Translate, SetI18n] = [t, setI18n]

  return <InnerProvider value={value}>{props.children}</InnerProvider>
}
