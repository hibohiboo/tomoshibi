import { DataSource } from 'typeorm/browser'
import { getOnMemoryDB } from '../sqlite'
import { WASM_FILE_PATH } from '../sqlite/constants'
import { initSQL } from '../sqlite/initSQL'
import { User } from './models/User'
import type { PromiseReturnType } from '@/types'
import 'reflect-metadata'

const initRepository = async () => {
  const client = await getOnMemoryDB()
  Object.assign(globalThis as any, { SQL: await initSQL(WASM_FILE_PATH) })
  const conn = new DataSource({
    type: 'sqljs', // this connection search window.SQL on browser
    // database: ':memory:',
    // dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: ['query', 'schema'],
  })
  await conn.initialize()

  const userRepository = conn.getRepository(User)
  return { userRepository }
}
let repositories: PromiseReturnType<typeof initRepository> | undefined
export const getRepositories = async () => {
  if (repositories) return repositories
  repositories = await initRepository()
  return repositories
}
