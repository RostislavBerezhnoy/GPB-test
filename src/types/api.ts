export type ServiceDto = {
  id: string
  name: string
  price: number
}

export type ServiceDtoWithContent = ServiceDto & {
  content: string
}

export type CalendarEventsDto = {
  id: number
  date: string
  events: EventDto[]
}

export type EventDto = {
  id: number
  title: string
  start_date: string
  end_date: string
  reminder: number
}
