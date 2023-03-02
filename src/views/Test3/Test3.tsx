import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarQueries } from 'api'
import { useModal } from 'hooks/useModal'
import { Button, Calendar, ConfigProvider } from 'antd'
import { Box, WrappedBox } from 'components/Box'
import { Loader } from 'components/Loader'
import { CellRender } from './components/CellRender'
import { EventModal } from './components/EventModal'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import locale from 'antd/locale/ru_RU'
import { errorToastWithButton } from 'utils/errorToastWithButton'
import { EventDto } from 'types/api'
import { dateFormatter } from './utils'

export const Test3 = () => {
  const {
    isOpen: isEventModalOpen,
    closeModal: closeEventModal,
    openModal: openEventModal,
  } = useModal()

  const navigate = useNavigate()
  const [calendarMode, setCalendarMode] = useState<'month' | 'year'>('month')
  const [selectedEvents, setSelectedEvents] = useState<EventDto[]>([])
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
    const mounthEvents = calendarEvents.filter(
      ({ start_date }) => dayjs(start_date, 'YYYY-MM-DD').month() === value.month(),
    )

    if (mounthEvents.length !== 0) return <CellRender events={mounthEvents} />
  }

  const getEventsListByDate = (date: Dayjs): EventDto[] => {
    const currentCellDate = dateFormatter(date)

    return calendarEvents.filter(({ start_date }) => start_date.includes(currentCellDate))
  }

  const dateCellRender = (value: Dayjs) => {
    const events = getEventsListByDate(value)

    return <CellRender events={events} />
  }

  const eventshHendler = (value: Dayjs) => {
    if (calendarMode === 'month') {
      const events = getEventsListByDate(value)
      setSelectedEvents(() => events)
      openEventModal()
    }
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
          onSelect={eventshHendler}
          onPanelChange={(_, mode) => setCalendarMode(mode)}
        />
      </ConfigProvider>
      {isEventModalOpen && (
        <EventModal
          isOpen={isEventModalOpen}
          closeModal={closeEventModal}
          events={selectedEvents}
        />
      )}
    </Box>
  )
}
