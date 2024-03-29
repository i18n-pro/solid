import https from 'node:https'
import type { IncomingMessage, RequestOptions } from 'node:http'

/**
 * 基于内置 http 封装请求方法
 * @param url
 * @param options
 * @returns
 */
export default function fetch(
  url: string,
  options: {
    data?: Record<string, unknown> | unknown // 请求数据
  } & RequestOptions,
): Promise<unknown> {
  const { data, ...restOptions } = options

  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        ...restOptions,
      },
      (reqs: IncomingMessage) => {
        let res = ''
        reqs.on('data', (d: NodeJS.ArrayBufferView | ArrayBuffer) => {
          res += d
        })
        reqs.on('end', () => {
          try {
            resolve(res)
          } catch (error) {
            reject(error)
          }
        })
      },
    )

    req.on('error', (err: unknown) => {
      reject(err)
    })

    req.write(data || '')

    req.end()
  })
}
