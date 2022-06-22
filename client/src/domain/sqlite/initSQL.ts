import initSqlJs from 'sql.js'
export const initSQL = async (wasmFileDirPath: string) => {
  const SQL = await initSqlJs({
    locateFile: (file) => `${wasmFileDirPath}/${file}`,
  })

  return SQL
}
