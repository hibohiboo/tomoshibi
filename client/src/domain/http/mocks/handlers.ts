import { rest } from 'msw'
export const handlers = [
  rest.put('/v1/api/test/:uuid', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.get('/user', null),
]
