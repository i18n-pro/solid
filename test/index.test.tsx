import { render, fireEvent } from '@solidjs/testing-library'
import '@testing-library/jest-dom'
import { I18nProvider, useI18n } from '../src'

it('No Provider is used', () => {
  function Content() {
    const { t, setI18n } = useI18n()

    return (
      <>
        <div id="text">{t('你好世界')}</div>
        <div>{t('测试警告')}</div>
        <div>{t('测试警告')}</div>
        <button id="zhBtn" onClick={() => setI18n({ locale: 'zh' })}>
          简体中文
        </button>
        <button id="enBtn" onClick={() => setI18n({ locale: 'en' })}>
          English
        </button>
        <button id="unknownBtn" onClick={() => setI18n({ locale: undefined })}>
          English
        </button>
      </>
    )
  }

  function App() {
    return <Content />
  }

  const spyWarn = vi.spyOn(console, 'warn')

  const { container } = render(() => <App />)

  const textWrapper = container.querySelector('#text')
  const zhBtn = container.querySelector('#zhBtn') as Element
  const enBtn = container.querySelector('#enBtn') as Element
  const unknownBtn = container.querySelector('#unknownBtn') as Element

  expect(textWrapper).toHaveTextContent('你好世界')

  fireEvent.click(enBtn)
  expect(textWrapper).toHaveTextContent('你好世界')

  fireEvent.click(zhBtn)
  expect(textWrapper).toHaveTextContent('你好世界')

  fireEvent.click(enBtn)
  expect(textWrapper).toHaveTextContent('你好世界')

  fireEvent.click(unknownBtn)
  expect(textWrapper).toHaveTextContent('你好世界')

  expect(spyWarn).toHaveBeenCalledTimes(1)
  expect(spyWarn).toHaveBeenCalledWith('useI18n should be wrapped by Provider')
})

describe('Full Test', () => {
  it('Single', async () => {
    function Content() {
      const { t, setI18n, i18nState } = useI18n()

      return (
        <>
          <div id="text">{t('你好世界')}</div>
          <button id="zhBtn" onClick={() => setI18n({ locale: 'zh' })}>
            简体中文
          </button>
          <button id="enBtn" onClick={() => setI18n({ locale: 'en' })}>
            English
          </button>
          <button
            id="unknownBtn"
            onClick={() => setI18n({ locale: undefined })}
          >
            English
          </button>
          <button
            id="jpBtn"
            onClick={() =>
              setI18n({
                locale: 'jp',
                langs: {
                  jp: {
                    你好世界: 'こんにちは、世界',
                  },
                },
              })
            }
          >
            English
          </button>
          <div id="locale">{i18nState().locale}</div>
        </>
      )
    }

    function App() {
      return (
        <I18nProvider
          namespace="t-pro-test"
          langs={{
            en: {
              你好世界: 'Hello World',
            },
          }}
        >
          <div>a</div>
          <Content />
        </I18nProvider>
      )
    }

    const { container } = render(() => <App />)

    const textWrapper = container.querySelector('#text')
    const zhBtn = container.querySelector('#zhBtn') as Element
    const enBtn = container.querySelector('#enBtn') as Element
    const unknownBtn = container.querySelector('#unknownBtn') as Element
    const jpBtn = container.querySelector('#jpBtn') as Element
    const localeDiv = container.querySelector('#locale') as Element

    expect(textWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('')

    fireEvent.click(enBtn)
    expect(textWrapper).toHaveTextContent('Hello World')
    expect(localeDiv).toHaveTextContent('en')

    fireEvent.click(zhBtn)
    expect(textWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('zh')

    fireEvent.click(enBtn)
    expect(textWrapper).toHaveTextContent('Hello World')
    expect(localeDiv).toHaveTextContent('en')

    fireEvent.click(unknownBtn)
    expect(textWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('')

    fireEvent.click(jpBtn)
    expect(textWrapper).toHaveTextContent('こんにちは、世界')
    expect(localeDiv).toHaveTextContent('jp')
  })

  it('Nested', () => {
    const PREFIX = 'nested'

    function getContent(props: {
      prefix?: string
      NestedComponent?: React.FC
    }) {
      const { prefix = '', NestedComponent: ChildComponent = () => null } =
        props

      return function Content() {
        const { t, setI18n, i18nState } = useI18n()

        function getId(id: string) {
          if (!prefix) return id
          id = prefix + id[0].toUpperCase() + id.substring(1)
          return id
        }

        return (
          <>
            <div id={getId('text')}>{t('你好世界')}</div>
            <button
              id={getId('zhBtn')}
              onClick={() => setI18n({ locale: 'zh' })}
            >
              简体中文
            </button>
            <button
              id={getId('enBtn')}
              onClick={() => setI18n({ locale: 'en' })}
            >
              English
            </button>
            <button
              id={getId('unknownBtn')}
              onClick={() => setI18n({ locale: undefined })}
            >
              English
            </button>
            <button
              id={getId('jpBtn')}
              onClick={() =>
                setI18n({
                  locale: 'jp',
                  langs: {
                    jp: {
                      你好世界: 'こんにちは、世界',
                    },
                  },
                })
              }
            >
              English
            </button>
            <div id={getId('locale')}>{i18nState().locale}</div>
            <ChildComponent />
          </>
        )
      }
    }

    const ChildMemoContent = getContent({ prefix: PREFIX })

    function NestedApp() {
      return (
        <I18nProvider
          namespace="full-test-nested"
          langs={{
            en: {
              你好世界: 'Hello World',
            },
          }}
        >
          <div>a</div>
          <ChildMemoContent />
        </I18nProvider>
      )
    }

    const MemoContent = getContent({ NestedComponent: NestedApp })

    function App() {
      return (
        <I18nProvider
          namespace="full-test-out"
          langs={{
            en: {
              你好世界: 'Hello World',
            },
          }}
        >
          <div>a</div>
          <MemoContent />
        </I18nProvider>
      )
    }

    const { container } = render(() => <App />)

    const textWrapper = container.querySelector('#text')
    const nestedTextWrapper = container.querySelector('#nestedText')
    const zhBtn = container.querySelector('#zhBtn') as Element
    const nestedZhBtn = container.querySelector('#nestedZhBtn') as Element
    const enBtn = container.querySelector('#enBtn') as Element
    const nestedEnBtn = container.querySelector('#nestedEnBtn') as Element
    const unknownBtn = container.querySelector('#unknownBtn') as Element
    const nestedUnknownBtn = container.querySelector(
      '#nestedUnknownBtn',
    ) as Element
    const jpBtn = container.querySelector('#jpBtn') as Element
    const nestedJpBtn = container.querySelector('#nestedJpBtn') as Element
    const localeDiv = container.querySelector('#locale') as Element
    const nestedLocaleDiv = container.querySelector('#nestedLocale') as Element

    expect(textWrapper).toHaveTextContent('你好世界')
    expect(nestedTextWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('')
    expect(nestedLocaleDiv).toHaveTextContent('')

    // Out Switch

    fireEvent.click(enBtn)
    expect(textWrapper).toHaveTextContent('Hello World')
    expect(nestedTextWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('en')
    expect(nestedLocaleDiv).toHaveTextContent('')

    fireEvent.click(zhBtn)
    expect(textWrapper).toHaveTextContent('你好世界')
    expect(nestedTextWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('zh')
    expect(nestedLocaleDiv).toHaveTextContent('')

    fireEvent.click(enBtn)
    expect(textWrapper).toHaveTextContent('Hello World')
    expect(nestedTextWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('en')
    expect(nestedLocaleDiv).toHaveTextContent('')

    fireEvent.click(unknownBtn)
    expect(textWrapper).toHaveTextContent('你好世界')
    expect(nestedTextWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('')
    expect(nestedLocaleDiv).toHaveTextContent('')

    fireEvent.click(jpBtn)
    expect(textWrapper).toHaveTextContent('こんにちは、世界')
    expect(nestedTextWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('jp')
    expect(nestedLocaleDiv).toHaveTextContent('')

    // Nested Switch

    fireEvent.click(nestedEnBtn)
    expect(textWrapper).toHaveTextContent('こんにちは、世界')
    expect(nestedTextWrapper).toHaveTextContent('Hello World')
    expect(localeDiv).toHaveTextContent('jp')
    expect(nestedLocaleDiv).toHaveTextContent('en')

    fireEvent.click(nestedZhBtn)
    expect(textWrapper).toHaveTextContent('こんにちは、世界')
    expect(nestedTextWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('jp')
    expect(nestedLocaleDiv).toHaveTextContent('zh')

    fireEvent.click(nestedEnBtn)
    expect(textWrapper).toHaveTextContent('こんにちは、世界')
    expect(nestedTextWrapper).toHaveTextContent('Hello World')
    expect(localeDiv).toHaveTextContent('jp')
    expect(nestedLocaleDiv).toHaveTextContent('en')

    fireEvent.click(nestedUnknownBtn)
    expect(textWrapper).toHaveTextContent('こんにちは、世界')
    expect(nestedTextWrapper).toHaveTextContent('你好世界')
    expect(localeDiv).toHaveTextContent('jp')
    expect(nestedLocaleDiv).toHaveTextContent('')

    fireEvent.click(nestedJpBtn)
    expect(textWrapper).toHaveTextContent('こんにちは、世界')
    expect(nestedTextWrapper).toHaveTextContent('こんにちは、世界')
    expect(localeDiv).toHaveTextContent('jp')
    expect(nestedLocaleDiv).toHaveTextContent('jp')
  })
})
