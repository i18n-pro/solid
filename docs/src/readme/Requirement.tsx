import { H1, List } from 'jsx-to-md'

export default function Requirement() {
  return (
    <>
      <H1>{t('要求')}</H1>
      <List
        items={[
          'U',
          'solid-js >= **1.0.0**',
          'i18n-pro >= **2.0.0** < **3.0.0**',
        ]}
      />
    </>
  )
}
