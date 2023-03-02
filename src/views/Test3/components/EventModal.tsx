import { FC } from 'react'
import { Modal, Button } from 'antd'
import { EventDto } from 'types/api'

export type EventModalProps = {
  isOpen: boolean
  closeModal: () => void
  events: EventDto[]
}

export const EventModal: FC<EventModalProps> = ({ isOpen, closeModal, events }) => {
  console.log(events)

  return (
    <Modal
      title='Запланированные мероприятия'
      open={isOpen}
      footer={[
        <Button key='submit' onClick={closeModal}>
          Закрыть
        </Button>,
      ]}
    >
      <p>435345345</p>
    </Modal>
  )
}
