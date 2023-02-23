import { useEffect } from 'react'
import { ServiceQueries } from 'api'
import { Table } from 'antd'
import { Box } from 'components/Box'
import { Loader } from 'components/Loader'
import { errorToastWithButton } from 'utils/errorToastWithButton'
import { columns } from './helpers'

export const Test2 = () => {
  const { useGetServiceListQuery } = ServiceQueries

  const {
    data: services = [],
    isLoading: isServicesLoading,
    isError: isServicesError,
    refetch: refetchServices,
  } = useGetServiceListQuery()

  useEffect(() => {
    if (isServicesError) errorToastWithButton({ retry: () => refetchServices() })
  }, [isServicesError, refetchServices])

  if (isServicesLoading)
    return (
      <Box alignItems='center' justifyContent='center' padding={100}>
        <Loader />
      </Box>
    )

  return <Table columns={columns} dataSource={services} rowKey={record => record.id} />
}
