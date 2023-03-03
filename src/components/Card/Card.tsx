import { FC } from 'react'
import { List, Typography } from 'antd'

export type CardProps = {
  header: string
  options: string[]
  text: string
}

const { Title, Text } = Typography

export const Card: FC<CardProps> = ({ header, options, text }) => (
  <List
    size='small'
    style={{ width: '100%', minWidth: 280, maxWidth: 350, minHeight: 350 }}
    header={<Title level={3}>{header}</Title>}
    footer={
      <div style={{ marginTop: 10 }}>
        <Text>{text}</Text>
      </div>
    }
    bordered
    dataSource={options}
    renderItem={item => <List.Item>{item}</List.Item>}
  />
)
