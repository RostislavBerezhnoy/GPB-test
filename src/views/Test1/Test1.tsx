import { Col, Row } from 'antd'
import { Card } from 'components/Card'
import { mock } from './mocks'

export const Test1 = () => (
  <Row gutter={[16, 16]}>
    {mock.map((item, i) => (
      <Col xs={16} sm={14} md={12} lg={10} xl={8} xxl={6} key={i}>
        <Card header={item.header} options={item.options} text={item.text} />
      </Col>
    ))}
  </Row>
)
