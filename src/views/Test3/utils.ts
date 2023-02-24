import type { Dayjs } from 'dayjs'
//'YYYY-MM-DDTHH:mm:ssZ[Z]'
export const dateFormatter = (date: Dayjs) => date.format('YYYY-MM-DD')
