import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarQueries } from 'api'
import toast from 'react-hot-toast'
import { Modal, Button, List } from 'antd'
import { EventDto } from 'types/api'
import { Box } from 'components/Box'
import { Loader } from 'components/Loader'
import { EVENTS_PER_PAGE } from '../helpers'

export type EventModalProps = {
  isOpen: boolean
  closeModal: () => void
  events: EventDto[]
}

export const EventModal: FC<EventModalProps> = ({ isOpen, closeModal, events }) => {
  const [eventsList, setEventsList] = useState<EventDto[]>([])
  const [currentEventId, setCurrentEventId] = useState<number | null>(null)

  useEffect(() => {
    if (events) setEventsList(events)
  }, [events])

  const navigate = useNavigate()
  const { useDeleteCalendarEventMutation } = CalendarQueries

  const [
    deleteEvent,
    {
      isLoading: isDeleteEventLoading,
      isSuccess: isDeleteEventSuccess,
      isError: isDeleteEventError,
    },
  ] = useDeleteCalendarEventMutation()

  useEffect(() => {
    if (isDeleteEventSuccess && currentEventId) {
      toast.success('Cобытие успешно удалено!')
      setEventsList(prev => prev.filter(item => item.id !== currentEventId))
    }
  }, [isDeleteEventSuccess, currentEventId])

  useEffect(() => {
    if (isDeleteEventError) toast.error('Не удалось удалить событие!')
  }, [isDeleteEventError])

  const handleDelete = (id: number) => {
    setCurrentEventId(() => id)
    void deleteEvent(id)
  }

  return (
    <Modal
      title='Запланированные мероприятия'
      open={isOpen}
      onCancel={closeModal}
      footer={[
        <Button key='submit' onClick={closeModal}>
          Закрыть
        </Button>,
      ]}
    >
      <Box margin='20px 0 30px 0'>
        <List
          size='small'
          dataSource={eventsList}
          pagination={eventsList.length > EVENTS_PER_PAGE && { pageSize: EVENTS_PER_PAGE }}
          renderItem={({ id, title }) => (
            <List.Item
              actions={
                isDeleteEventLoading && currentEventId === id
                  ? [<Loader size={14} />]
                  : [
                      <Button
                        type='text'
                        style={{ color: '#818181', padding: '0 4px' }}
                        onClick={() => navigate(`/test3/${id}`)}
                      >
                        edit
                      </Button>,
                      <Button
                        type='text'
                        style={{ color: '#ff4d4f', padding: '0 4px' }}
                        onClick={() => handleDelete(id)}
                      >
                        del
                      </Button>,
                    ]
              }
            >
              {title}
            </List.Item>
          )}
        />
      </Box>
    </Modal>
  )
}
