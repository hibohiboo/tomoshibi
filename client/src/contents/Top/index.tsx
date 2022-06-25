import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getOnMemoryDB } from '@/domain/sqlite'
import type { OnMemorySQLite } from '@/domain/sqlite/OnMemorySQLite'
import { getRepositories } from '@/domain/todo'
import { PromiseReturnType } from '@/types'

const Wrapper = styled.div`
  --txt-color: #fff; /* opacity 0.9 のときの #fffの値 */
  --oveflow-color: #010101; /* ブラックスミア防止に#000を避ける */
  --base-color: #1f2023;
  --surface-color: #27292d;
  --overlay-dark-color: #202f34;
  --overlay-light-color: #38384d;
  --green-color: #55c500;
  background-color: var(--oveflow-color);
  position: relative;
  width: 100%;
  min-height: 100%;
  padding-bottom: 100px;
`

const Top: React.FC = () => {
  const [repositories, setRepo] = useState<PromiseReturnType<
    typeof getRepositories
  > | null>(null)
  const [db, setDB] = useState<OnMemorySQLite | null>(null)
  const [ret, setRet] = useState('')
  useEffect(() => {
    ;(async () => {
      setDB(await getOnMemoryDB())
      setRepo(await getRepositories())
    })()
  }, [])
  return (
    <Wrapper>
      {!db ? (
        <></>
      ) : (
        <div>
          <button
            onClick={() => {
              db.run(` CREATE TABLE IF NOT EXISTS people (name TEXT, age INT);`)
              db.run(
                ` 
                INSERT INTO people VALUES ('Michel',3);
                INSERT INTO people VALUES ('JOHNSON',4);`,
              )
            }}
          >
            seed
          </button>
          <button
            onClick={() => {
              const result = db.exec(`SELECT * from people;`)
              setRet(JSON.stringify(result))
            }}
          >
            select
          </button>
          <button onClick={() => db.export()}>export</button>
          <button onClick={() => db.load()}>load</button>
          <button
            onClick={async () => {
              await repositories?.userRepository.insert([
                { name: 'test', id: 'test' },
              ])
              setRet(JSON.stringify(await repositories?.userRepository.count()))
            }}
          >
            test
          </button>
          <button
            onClick={async () => {
              const ret = await repositories?.userRepository.findOne({
                where: { id: 'test' },
              })
              setRet(JSON.stringify(ret))
            }}
          >
            test load
          </button>
          <div>{ret}</div>
        </div>
      )}
    </Wrapper>
  )
}
export default Top
