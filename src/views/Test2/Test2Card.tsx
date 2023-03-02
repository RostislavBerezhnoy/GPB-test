import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ServiceQueries } from 'api'
import { Typography } from 'antd'
import { ServiceCard } from './components/ServiceCard'
import { WrappedBox } from 'components/Box'
import { Loader } from 'components/Loader'
import { BackButton } from 'components/BackButton'
import { errorToastWithButton } from 'utils/errorToastWithButton'

const { Title } = Typography

export const Test2Card = () => {
  const { id = '' } = useParams()
  const { useGetServiceByIdQuery } = ServiceQueries

  const {
    data: service = {},
    isLoading: isServiceLoading,
    isError: isServiceError,
    refetch: refetchService,
  } = useGetServiceByIdQuery(id, { skip: !id })

  useEffect(() => {
    if (isServiceError) errorToastWithButton({ retry: () => refetchService() })
  }, [isServiceError, refetchService])

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
        <ServiceCard {...service} />
      ) : (
        <WrappedBox>
          <Title level={3}>Нет данных</Title>
        </WrappedBox>
      )}
    </>
  )
}
