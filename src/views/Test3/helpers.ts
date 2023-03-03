import dayjs from 'dayjs'
import * as Yup from 'yup'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ[Z]'
export const defaultDateRangeValue = dayjs('00:00:00', 'HH:mm:ss')

export const validationSchema = Yup.object({
  title: Yup.string().required(),
  start_date: Yup.string().required(),
  end_date: Yup.string().required(),
  reminder: Yup.number(),
})

export const MONTH_MODE: CalendarMode = 'month'
export const YEAR_MODE: CalendarMode = 'year'

export const EVENTS_PER_PAGE = 5

export const EMPTY_TYME = '00:00:00'
