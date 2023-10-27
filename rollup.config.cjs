const ts = require('rollup-plugin-typescript2')
const prettier = require('rollup-plugin-prettier')
const { terser } = require('rollup-plugin-terser')
const { version, name } = require('./package.json')
const solid = require('vite-plugin-solid')

const formats = ['esm.min']

const copyright =
  'MIT@Copyright (c) 2023-present Eyelly Wu <https://github.com/eyelly-wu>'

const banner = `/*
* ${name}
* v${version}
* ${new Date().toLocaleString()}
* ${copyright}
*/`

const minBanner = `// ${name} v${version} ${new Date().toLocaleString()} ${copyright}`

module.exports = formats.map((format, index) => {
  const isLast = index === formats.length - 1
  let pluginsExtra = []

  const suffix = format.split('.')[1]

  if (format.includes('.')) {
    pluginsExtra.push(
      terser({
        format: {
          comments: /@i18n-pro\/solid/,
        },
      }),
    )
  }

  return {
    input: 'src/index.ts',
    output: {
      file: `dist/src/index${suffix ? '.' + suffix : ''}.js`,
      format: format.includes('.') ? format.split('.')[0] : format,
      banner: suffix ? minBanner : banner,
      name: 'solidI18nPro',
    },
    plugins: [
      solid(),
      ts({
        useTsconfigDeclarationDir: isLast,
        tsconfigOverride: {
          compilerOptions: {
            removeComments: false,
            declaration: false,
            module: 'esnext',
            target: 'es5',
            resolveJsonModule: true,
          },
          include: ['./src'],
          exclude: ['./docs', './test'],
        },
      }),
      prettier(),
      ...pluginsExtra,
    ],
  }
})
