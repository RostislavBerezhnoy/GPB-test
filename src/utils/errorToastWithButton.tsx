import toast from 'react-hot-toast'
import { Button } from 'antd'
import { Box } from 'components/Box'

export type errorToastWithButtonProps = {
  errorText?: string
  retryText?: string
  retry: () => void
}

export const errorToastWithButton = ({
  errorText = 'Произошла ошибка!',
  retryText = 'Повторить запрос',
  retry,
}: errorToastWithButtonProps) =>
  toast(
    t => (
      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        whiteSpace='nowrap'
      >
        {errorText}
        <Button
          type='primary'
          style={{
            width: 150,
            marginLeft: 10,
            background: '#343A40',
            borderColor: '#343A40',
          }}
          onClick={() => {
            retry()
            toast.dismiss(t.id)
          }}
        >
          {retryText}
        </Button>
      </Box>
    ),
    {
      style: {
        background: '#F8D7DA',
        color: '#852336',
      },
    },
  )
