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
    // http://localhost:3000/get-users-value?from=2022-07-01&to=2022-07-03&users=1%2C2
    return res(ctx.status(200), ctx.json(req))
  }),
]
