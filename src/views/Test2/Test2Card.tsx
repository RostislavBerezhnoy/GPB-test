import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ServiceQueries } from 'api'
import { Card, Typography } from 'antd'
import { Box, WrappedBox } from 'components/Box'
import { Loader } from 'components/Loader'
import { BackButton } from 'components/BackButton'
import { errorToastWithButton } from 'utils/errorToastWithButton'

export const Test2Card = () => {
  const { id = '' } = useParams()
  const { useGetServiceByIdQuery } = ServiceQueries

  const {
    data: service,
    isLoading: isServiceLoading,
    isError: isServiceError,
    refetch: refetchService,
  } = useGetServiceByIdQuery(id, { skip: !id })

  useEffect(() => {
    if (isServiceError) errorToastWithButton({ retry: () => refetchService() })
  }, [isServiceError, refetchService])

  const { Title, Text } = Typography

  if (isServiceLoading)
    return (
      <WrappedBox>
        <Loader />
      </WrappedBox>
    )

  return (
    <>
      <BackButton marginBottom={20} />
      {Object.getOwnPropertyNames(service).length !== 0 ? (
        <Card title={service?.name} style={{ width: 300 }}>
          <Box flexDirection='row' justifyContent='space-between'>
            <Text>Цена:</Text>
            <Text>{service?.price}</Text>
          </Box>
        </Card>
      ) : (
        <WrappedBox>
          <Title level={3}>Нет данных</Title>
        </WrappedBox>
      )}
    </>
  )
}
