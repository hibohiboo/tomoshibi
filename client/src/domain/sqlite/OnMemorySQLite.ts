import { WASM_FILE_PATH } from './constants'
import { initSQL } from './initSQL'
import type { Database } from 'sql.js'

const EXPORT_FILE_NAME = 'my_data.db'
export class OnMemorySQLite {
  #dirHandle: FileSystemDirectoryHandle | null = null
  constructor(private db: Database) {}
  run(sql: string): void {
    this.db.run(sql)
  }
  exec(sql: string) {
    return this.db.exec(sql)
  }
  async export() {
    const binaryArray: Uint8Array = this.db.export()
    const dirHandle = await this.#getDirectoryPicker()
    if (!dirHandle) return

    try {
      const fileHandle = await dirHandle.getFileHandle(EXPORT_FILE_NAME, {
        create: true,
      })
      const writable = await fileHandle.createWritable()
      await writable.write(binaryArray)
      await writable.close()
    } catch (e) {
      // キャンセル時AbortError
      console.log(e)
    }
  }
  async load() {
    const dirHandle = await this.#getDirectoryPicker()
    if (!dirHandle) return
    const fileHandle = await dirHandle.getFileHandle(EXPORT_FILE_NAME)
    const file = await fileHandle.getFile()
    const arrayBuffer = await file.arrayBuffer()

    const dbAsUint8Array = new Uint8Array(arrayBuffer)
    const SQL = await initSQL(WASM_FILE_PATH)

    this.db = new SQL.Database(dbAsUint8Array)
  }
  async loadWritable() {
    const dirHandle = await this.#getDirectoryPicker()
    if (!dirHandle) return
    if (!(await this.checkPermission(dirHandle))) return
    const fileHandle = await dirHandle.getFileHandle(EXPORT_FILE_NAME)
    const file = await fileHandle.getFile()
    const arrayBuffer = await file.arrayBuffer()

    const dbAsUint8Array = new Uint8Array(arrayBuffer)
    const SQL = await initSQL(WASM_FILE_PATH)

    this.db = new SQL.Database(dbAsUint8Array)
  }
  private async checkPermission(
    dirHandle: FileSystemDirectoryHandle,
  ): Promise<boolean> {
    const opts = { writable: true, mode: 'readwrite' } as const

    // Check if we already have permission, if so, return
    if ((await dirHandle.queryPermission(opts)) === 'granted') return true

    // Request permission to the file, if the user grants permission, return true.
    if ((await dirHandle.requestPermission(opts)) === 'granted') return true
    return false
  }
  async #getDirectoryPicker() {
    if (this.#dirHandle) return this.#dirHandle
    try {
      const dirHandle = await window.showDirectoryPicker()
      this.#dirHandle = dirHandle
      return dirHandle
    } catch (e: any) {
      console.log(e)
    }
  }
}
