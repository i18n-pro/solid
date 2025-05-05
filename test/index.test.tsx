import { render, screen, fireEvent } from '@solidjs/testing-library'
import '@testing-library/jest-dom'
import { I18nProvider, useI18n } from '../src'
import { describe, it, expect } from 'vitest'
import { type Component } from 'solid-js'

describe('Provider and Context', () => {
  it('renders children', () => {
    render(() => (
      <I18nProvider namespace="test-children" langs={{}}>
        <div data-testid="child">child</div>
      </I18nProvider>
    ))
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toHaveTextContent('child')
  })

  it('provides t, setI18n, and i18nState via context', () => {
    const Child: Component = () => {
      const { t, setI18n, i18nState } = useI18n()
      return (
        <>
          <div data-testid="t">{t('hello')}</div>
          <div data-testid="locale">{i18nState().locale ?? ''}</div>
          <button
            onClick={() =>
              setI18n({
                locale: 'en',
                langs: { en: { hello: 'Hello!' } },
              })
            }
          >
            EN
          </button>
        </>
      )
    }
    render(() => (
      <I18nProvider
        namespace="test-context"
        langs={{ en: { hello: 'Hello!' } }}
      >
        <Child />
      </I18nProvider>
    ))
    expect(screen.getByTestId('t')).toBeInTheDocument()
    expect(screen.getByTestId('t')).toHaveTextContent('hello')
    expect(screen.getByTestId('locale')).toHaveTextContent('')
    fireEvent.click(screen.getByText('EN'))
    expect(screen.getByTestId('t')).toHaveTextContent('Hello!')
    expect(screen.getByTestId('locale')).toHaveTextContent('en')
  })

  it('t returns untranslated key if translation missing', () => {
    const Child: Component = () => {
      const { t, setI18n } = useI18n()
      return (
        <>
          <div data-testid="t">{t('missing')}</div>
          <button onClick={() => setI18n({ locale: 'en' })}>EN</button>
        </>
      )
    }
    render(() => (
      <I18nProvider
        namespace="test-missing"
        langs={{ en: { hello: 'Hello!' } }}
      >
        <Child />
      </I18nProvider>
    ))
    expect(screen.getByTestId('t')).toHaveTextContent('missing')
    fireEvent.click(screen.getByText('EN'))
    expect(screen.getByTestId('t')).toHaveTextContent('missing')
  })

  it('setI18n can update langs and locale together', () => {
    const Child: Component = () => {
      const { t, setI18n, i18nState } = useI18n()
      return (
        <>
          <div data-testid="t">{t('foo')}</div>
          <div data-testid="locale">{i18nState().locale ?? ''}</div>
          <button
            onClick={() =>
              setI18n({
                locale: 'jp',
                langs: { jp: { foo: 'こんにちは' } },
              })
            }
          >
            JP
          </button>
        </>
      )
    }
    render(() => (
      <I18nProvider namespace="test-jp" langs={{ en: { foo: 'bar' } }}>
        <Child />
      </I18nProvider>
    ))
    expect(screen.getByTestId('t')).toHaveTextContent('foo')
    fireEvent.click(screen.getByText('JP'))
    expect(screen.getByTestId('t')).toHaveTextContent('こんにちは')
    expect(screen.getByTestId('locale')).toHaveTextContent('jp')
  })

  it('default context returns default t, setI18n, and i18nState', () => {
    // This test does NOT use a provider
    const Child: Component = () => {
      const { t, setI18n, i18nState } = useI18n()
      return (
        <>
          <div data-testid="t">{t('bar')}</div>
          <div data-testid="ns">{i18nState().namespace}</div>
          <button
            onClick={() =>
              setI18n({
                locale: 'en',
                langs: { en: { bar: 'BAR' } },
              })
            }
          >
            EN
          </button>
        </>
      )
    }
    render(() => <Child />)
    expect(screen.getByTestId('t')).toHaveTextContent('bar')
    expect(screen.getByTestId('ns')).toHaveTextContent('unknown')
    fireEvent.click(screen.getByText('EN'))
    expect(screen.getByTestId('t')).toHaveTextContent('bar')
  })

  it('useI18n never throws (default context always present)', () => {
    // This test ensures that useI18n does not throw outside a provider
    const Child: Component = () => {
      const { t } = useI18n()
      return <div data-testid="t">{t('baz')}</div>
    }
    render(() => <Child />)
    expect(screen.getByTestId('t')).toHaveTextContent('baz')
  })
})
