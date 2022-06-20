import { addDays, differenceInDays, format } from 'date-fns'

export const getData = (from: Date, to: Date) => {
  const diff = differenceInDays(to, from)
  return new Array(diff).fill(0).map((_, i) => ({
    date: format(addDays(from, i), 'yyyy-MM-dd'),
    value: ~~(Math.random() * 100),
  }))
}
