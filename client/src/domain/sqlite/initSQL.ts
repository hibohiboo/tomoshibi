import initSqlJs, { SqlJsStatic } from 'sql.js'

export const initSQL = async (wasmFileDirPath: string) => {
  const SQL: SqlJsStatic = await initSqlJs({
    locateFile: (file) => `${wasmFileDirPath}/${file}`,
  })
  // typeorm用にwindow.SQLに保存
  Object.assign(globalThis as any, { SQL })

  return SQL
}
