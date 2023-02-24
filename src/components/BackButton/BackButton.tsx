import { FC, CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { Box } from 'components/Box'

export type BackButtonProps = CSSProperties & {
  text?: string
}

export const BackButton: FC<BackButtonProps> = ({ text = 'Назад', ...rest }) => {
  const navigate = useNavigate()

  return (
    <Box {...rest}>
      <Button style={{ width: 100 }} onClick={() => navigate(-1)}>
        {text}
      </Button>
    </Box>
  )
}
