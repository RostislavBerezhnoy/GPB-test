import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarQueries } from 'api'
import { Button, Calendar, ConfigProvider } from 'antd'
import { Box, WrappedBox } from 'components/Box'
import { Loader } from 'components/Loader'
import { CellRender } from './components/CellRender'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import locale from 'antd/locale/ru_RU'
import { errorToastWithButton } from 'utils/errorToastWithButton'
import { EventDto } from 'types/api'
import { dateFormatter } from './utils'

export const Test3 = () => {
  const navigate = useNavigate()
  const { useGetCalendarEventsListQuery } = CalendarQueries

  const {
    data: calendarEvents = [],
    isLoading: isCalendarEventsLoading,
    isError: isCalendarEventsError,
    refetch: refetchCalendarEvents,
  } = useGetCalendarEventsListQuery()

  useEffect(() => {
    if (isCalendarEventsError) errorToastWithButton({ retry: () => refetchCalendarEvents() })
  }, [isCalendarEventsError, refetchCalendarEvents])

  const monthCellRender = (value: Dayjs) => {
    const mounthEvents: EventDto[] = []
    const mounthData = calendarEvents.filter(
      ({ date }) => new Date(date).getMonth() === value.month(),
    )
    mounthData.forEach(({ events }) => mounthEvents.push(...events))

    if (mounthEvents.length !== 0) return <CellRender events={mounthEvents} />
  }

  const dateCellRender = (value: Dayjs) => {
    const currentCellDate = dateFormatter(value)
    const dayData = calendarEvents.find(({ date }) => date === currentCellDate)?.events || []

    return <CellRender events={dayData} />
  }

  const pushHendler = (value: Dayjs) => {
    const calendarDate = dateFormatter(value)
    const event = calendarEvents.find(({ date }) => date === calendarDate)

    if (event) navigate(`/test3/${event.id}`)
  }

  if (isCalendarEventsLoading)
    return (
      <WrappedBox>
        <Loader />
      </WrappedBox>
    )

  return (
    <Box>
      <Box marginBottom={20} alignItems='end'>
        <Button
          type='primary'
          size='large'
          style={{ width: 150 }}
          onClick={() => navigate('/test3/create')}
        >
          Создать
        </Button>
      </Box>
      <ConfigProvider locale={locale}>
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          defaultValue={dayjs(new Date())}
          onSelect={pushHendler}
        />
      </ConfigProvider>
    </Box>
  )
}
