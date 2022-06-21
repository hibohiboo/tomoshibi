import { rest } from 'msw'
import { getData } from './data'
const domain = 'http://localhost:3000/'
export const handlers = [
  rest.get(`${domain}get-value`, (req, res, ctx) => {
    const from = req.url.searchParams.get('from')
    const to = req.url.searchParams.get('to')
    console.log(from, to)
    if (typeof from === 'string' && typeof to === 'string') {
      const data = getData(new Date(from), new Date(to))
      return res(ctx.status(200), ctx.json(data))
    }
    return res(ctx.status(200), ctx.json(req))
  }),
  rest.get(`${domain}get-users-value`, (req, res, ctx) => {
    // fetchの場合
    // http://localhost:3000/get-users-value?from=2022-07-01&to=2022-07-03&users=1%2C2
    // axiosの場合
    // http://localhost:3000/get-users-value?from=2022-07-01&to=2022-07-03&users[]=1&users[]=2

    const from = req.url.searchParams.get('from')
    const to = req.url.searchParams.get('to')
    const users = req.url.searchParams.getAll('users[]') || []
    if (typeof from === 'string' && typeof to === 'string') {
      const ret = users.flatMap((userId) =>
        getData(new Date(from), new Date(to)).map((i) => ({ ...i, userId })),
      )
      return res(ctx.status(200), ctx.json(ret))
    }

    return res(ctx.status(200), ctx.json(req))
  }),
  rest.get(`${domain}get-value-with-auth`, (req, res, ctx) => {
    if (!req.headers.get('x-api-key')) {
      return res(ctx.status(401), ctx.json(req))
    }
    return res(ctx.status(200), ctx.json(req))
  }),
]
