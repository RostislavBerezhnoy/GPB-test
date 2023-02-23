import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'

const items: MenuProps['items'] = ['test1', 'test2', 'test3'].map(key => ({
  key,
  label: key.replace(/^./, str => str.toUpperCase()),
}))

export const DefaultHeader: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Menu
      theme='dark'
      mode='horizontal'
      selectedKeys={[pathname.replace('/', '')]}
      items={items}
      onClick={({ key }) => navigate(key)}
    />
  )
}
