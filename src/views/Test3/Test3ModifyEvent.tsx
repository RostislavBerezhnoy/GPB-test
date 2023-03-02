import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CalendarQueries } from 'api'
import { Typography } from 'antd'
import { BackButton } from 'components/BackButton'
import { WrappedBox, Box } from 'components/Box'
import { Loader } from 'components/Loader'
import { EventCard } from './components/EventCard'
import { errorToastWithButton } from 'utils/errorToastWithButton'

const { Title } = Typography

export const Test3ModifyEvent = () => {
  const { id = '' } = useParams()
  const { useGetCalendarEventByIdQuery } = CalendarQueries

  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
    refetch: refetchEvent,
  } = useGetCalendarEventByIdQuery(+id, { skip: !id })

  useEffect(() => {
    if (isEventError) errorToastWithButton({ retry: () => refetchEvent() })
  }, [isEventError, refetchEvent])

  if (isEventLoading)
    return (
      <WrappedBox>
        <Loader />
      </WrappedBox>
    )

  if (!event)
    return (
      <WrappedBox>
        <Title level={3}>Нет данных</Title>
      </WrappedBox>
    )

  return (
    <Box>
      <Box marginBottom={10}>
        <BackButton />
      </Box>
      <EventCard event={event} />
    </Box>
  )
}
