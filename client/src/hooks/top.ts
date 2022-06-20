import { useGetUsersValueQuery, useGetValueQuery } from '@/store/api'

export const TopHooks = () => {
  const {
    data: valueData = [],
    isLoading,
    isFetching,
    isError,
  } = useGetValueQuery({ from: '2022-06-01', to: '2022-06-15' })
  const { data: usersData } = useGetUsersValueQuery({
    from: '2022-07-01',
    to: '2022-07-03',
    users: ['1', '2'],
  })
  return { valueData, usersData }
}
