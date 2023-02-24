import { FC } from 'react'
import { Typography } from 'antd'
import { EventDto } from 'types/api'

export type CellRenderProps = {
  events: EventDto[]
}

const { Text } = Typography

export const CellRender: FC<CellRenderProps> = ({ events }) => (
  <ul>
    {events.map(item => (
      <li key={item.id}>
        <Text>{item.title}</Text>
      </li>
    ))}
  </ul>
)
