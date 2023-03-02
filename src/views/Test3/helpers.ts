import dayjs from 'dayjs'
import * as Yup from 'yup'

export const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ[Z]'
export const defaultDateRangeValue = dayjs('00:00:00', 'HH:mm:ss')

export const validationSchema = Yup.object({
  title: Yup.string().required('Event title is required'),
  start_date: Yup.string().required('Start date is required'),
  end_date: Yup.string().required('End date is required'),
  reminder: Yup.number(),
})
