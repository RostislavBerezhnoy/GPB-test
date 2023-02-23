import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { DefaultHeader } from './Header'

const { Header, Content } = Layout

export const DefaultLayout: FC = () => (
  <Layout>
    <Header>
      <DefaultHeader />
    </Header>
    <Content style={{ padding: '20px' }}>
      <Outlet />
    </Content>
  </Layout>
)
