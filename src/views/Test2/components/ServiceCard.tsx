import { FC } from 'react'
import { Card, Typography } from 'antd'
import { Box } from 'components/Box'
import { ServiceDtoWithContent } from 'types/api'

export type ServiceCardProps = Partial<ServiceDtoWithContent>

const { Text } = Typography

export const ServiceCard: FC<ServiceCardProps> = ({ name, price, content }) => (
  <Card title={name} style={{ width: '100%', maxWidth: 300 }}>
    {content && (
      <Box marginBottom={40}>
        <Text italic>{content}</Text>
      </Box>
    )}
    {price && (
      <Box flexDirection='row' justifyContent='space-between'>
        <Text>Цена:</Text>
        <Text>{price}</Text>
      </Box>
    )}
  </Card>
)
