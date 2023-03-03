import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { DATETIME_FORMAT } from './helpers'

export const dateFormatter = (date: Dayjs) => date.format('YYYY-MM-DD')
export const timeFormatter = (time: string) => dayjs(time, DATETIME_FORMAT).format('HH:mm:ss')
