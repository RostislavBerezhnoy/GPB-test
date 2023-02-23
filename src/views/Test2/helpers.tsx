import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { ServiceDto } from 'types/api'

export const columns: ColumnsType<ServiceDto> = [
  {
    title: 'Название услуги',
    dataIndex: 'name',
    key: 'name',
    render: (_, item) => <Link to={`/test2/${item.id}`}>{item.name}</Link>,
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
  },
]
