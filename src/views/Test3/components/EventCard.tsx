import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarQueries } from 'api'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { Card, Input, DatePicker, Button, TimePicker } from 'antd'
import { Box } from 'components/Box'
import { CreateEventDto, EventDto } from 'types/api'
import { DATETIME_FORMAT, defaultDateRangeValue, EMPTY_TYME, validationSchema } from '../helpers'

const { RangePicker } = DatePicker

export type EventCardProps = {
  event?: EventDto
}

export const EventCard: FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate()
  const { useCreateCalendarEventMutation, useUpdateCalendarEventMutation } = CalendarQueries

  const [
    createEvent,
    {
      isLoading: isCreateEventLoading,
      isSuccess: isCreateEventSuccess,
      isError: isCreateEventError,
    },
  ] = useCreateCalendarEventMutation()

  const [
    updateEvent,
    {
      isLoading: isUpdateEventLoading,
      isSuccess: isUpdateEventSuccess,
      isError: isUpdateEventError,
    },
  ] = useUpdateCalendarEventMutation()

  useEffect(() => {
    if (isCreateEventSuccess) {
      toast.success('Новое событие успешно создано!')
      navigate('/test3')
    }
  }, [isCreateEventSuccess, navigate])

  useEffect(() => {
    if (isCreateEventError) toast.error('Не удалось создать новое событие!')
  }, [isCreateEventError])

  useEffect(() => {
    if (isUpdateEventSuccess) toast.success('Событие успешно отредактировано!')
  }, [isUpdateEventSuccess])

  useEffect(() => {
    if (isUpdateEventError) toast.error('Не удалось отредактировать событие!')
  }, [isUpdateEventError])

  const {
    values: { title, start_date, end_date, reminder },
    handleChange,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
  } = useFormik<CreateEventDto>({
    initialValues: {
      title: '',
      start_date: '',
      end_date: '',
      reminder: 0,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (event) void updateEvent({ id: event.id, ...values })
      else void createEvent(values)
    },
  })

  useEffect(() => {
    if (event) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { title, start_date, end_date, reminder } = event
      void setFieldValue('title', title)
      void setFieldValue('start_date', start_date)
      void setFieldValue('end_date', end_date)
      void setFieldValue('reminder', reminder)
    }
  }, [event, setFieldValue])

  const onDatetimeChange = (time: Dayjs[]) => {
    const [startDateTime, endDateTime] = time
    void setFieldValue('start_date', startDateTime.format(DATETIME_FORMAT))
    void setFieldValue('end_date', endDateTime.format(DATETIME_FORMAT))
  }

  const onTimeChange = (time: Dayjs | null, formattedTime: string) => {
    if (time && formattedTime !== EMPTY_TYME) void setFieldValue('reminder', time.valueOf())
  }

  return (
    <Card
      title={!event ? 'Создание нового события' : 'Редактирование события'}
      style={{ width: 500 }}
    >
      <Box marginBottom={30}>
        <Box marginBottom={10}>
          <Input
            placeholder='Enter event name'
            name='title'
            value={title}
            onChange={handleChange}
            status={Boolean(touched.title && errors.title) ? 'error' : undefined}
          />
        </Box>
        <Box marginBottom={10}>
          <RangePicker
            value={
              start_date && end_date
                ? [dayjs(start_date, DATETIME_FORMAT), dayjs(end_date, DATETIME_FORMAT)]
                : null
            }
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [defaultDateRangeValue, defaultDateRangeValue],
            }}
            format='YYYY-MM-DD HH:mm:ss'
            onChange={time => onDatetimeChange(time as Dayjs[])}
            status={
              Boolean(touched.start_date && errors.start_date) ||
              Boolean(touched.end_date && errors.end_date)
                ? 'error'
                : undefined
            }
          />
        </Box>
        <Box>
          <TimePicker
            value={reminder ? dayjs(reminder) : null}
            onChange={onTimeChange}
            defaultValue={defaultDateRangeValue}
          />
        </Box>
      </Box>
      <Box alignItems='end'>
        <Button
          type='primary'
          style={{ width: 120 }}
          onClick={() => handleSubmit()}
          loading={isCreateEventLoading || isUpdateEventLoading}
        >
          {!event ? 'Создать' : 'Сохранить'}
        </Button>
      </Box>
    </Card>
  )
}
