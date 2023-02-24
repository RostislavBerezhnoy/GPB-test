export type ServiceDto = {
  id: string
  name: string
  price: number
}

export type ServiceDtoWithContent = ServiceDto & {
  content: string
}
