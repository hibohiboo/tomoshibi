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
]
