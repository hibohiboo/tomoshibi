import { WASM_FILE_PATH } from './constants'
import { initSQL } from './initSQL'
import { OnMemorySQLite } from './OnMemorySQLite'
import type { Database } from 'sql.js'

const runSeed = (db: Database) => {
  db.run('CREATE TABLE IF NOT EXISTS people (name TEXT, age INT)')
  db.run(`INSERT INTO people VALUES ('JOHNSON',4);`)
}
let client: OnMemorySQLite | null = null
export const getOnMemoryDB = async () => {
  if (client) return client
  const SQL = await initSQL(WASM_FILE_PATH)
  const db = new SQL.Database()
  client = new OnMemorySQLite(db)
  return client
}
