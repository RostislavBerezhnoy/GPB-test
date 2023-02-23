import { FC } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

export type LoaderProps = {
  size?: number
}

export const Loader: FC<LoaderProps> = ({ size = 50 }) => (
  <Spin indicator={<LoadingOutlined style={{ fontSize: size, color: '#DB3948' }} spin />} />
)
