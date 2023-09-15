import { Break, H1, Bold, CodeBlock, List } from 'jsx-to-md'
import { getI18nProviderDesc, getI18nPro, getUseI18nDesc } from '../utils'

export default function Principle() {
  return (
    <>
      <H1>{t('原理')}</H1>
      {t(
        '该库是基于{0}结合{1}的{2}特性来实现的',
        getI18nPro('link'),
        ' `Solid` ',
        ' `context` ',
      )}
      <Break />
      <Break />
      {t('主要由{0}部分构成', ' `2` ')}
      <List items={['U', 'I18nProvider', 'useI18n']} />
      <Break />
      <Break />
      <Bold>I18nProvider</Bold>：{getI18nProviderDesc()}
      <br />
      <Bold>useI18n</Bold>：{getUseI18nDesc()}
      <Break />
      <Break />
      <Break />
      <Break />
      {t('简易示例如下')}
      <CodeBlock
        langType="typescript"
        code={`
import { render } from 'solid-js/web'
import { I18nProvider, useI18n } from '@i18n-pro/solid'

function App() {
  const { t } = useI18n()

  return <>{t('hello world')}</>
}

render(
  () => (
    <I18nProvider
      namespace="i18n-example"
      locale="en"
      langs={{
        zh: {
          'hello world': '你好世界',
        },
        ja:{
          "hello world": "こんにちは世界",
        },
      }}
    >
      <App />
    </I18nProvider>
  ),
  document.getElementById('root'),
)
`}
      />
    </>
  )
}
