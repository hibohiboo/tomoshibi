import { WASM_FILE_PATH } from './constants'
import { initSQL } from './initSQL'
import type { Database } from 'sql.js'

export class OnMemorySQLite {
  constructor(private db: Database) {}
  run(sql: string): void {
    this.db.run(sql)
  }
  exec(sql: string) {
    return this.db.exec(sql)
  }
  async export() {
    const binaryArray: Uint8Array = this.db.export()
    const dirHandle = await window.showDirectoryPicker()
    const fileHandle = await dirHandle.getFileHandle('my_data.db', {
      create: true,
    })
    const writable = await fileHandle.createWritable()
    await writable.write(binaryArray)
    await writable.close()
  }
  async load() {
    const dirHandle = await window.showDirectoryPicker()
    if (!(await this.checkPerm(dirHandle))) return
    const fileHandle = await dirHandle.getFileHandle('my_data.db')
    const file = await fileHandle.getFile()
    const arrayBuffer = await file.arrayBuffer()

    const dbAsUint8Array = new Uint8Array(arrayBuffer)
    const SQL = await initSQL(WASM_FILE_PATH)

    this.db = new SQL.Database(dbAsUint8Array)
  }
  private async checkPerm(
    dirHandle: FileSystemDirectoryHandle,
  ): Promise<boolean> {
    const opts = {
      writable: true,
      mode: 'readwrite',
    } as const

    // Check if we already have permission, if so, return
    if ((await dirHandle.queryPermission(opts)) === 'granted') return true

    // Request permission to the file, if the user grants permission, return true.
    if ((await dirHandle.requestPermission(opts)) === 'granted') return true
    return false
  }
}
