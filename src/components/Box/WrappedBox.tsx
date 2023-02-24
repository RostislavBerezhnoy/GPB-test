import { FC, PropsWithChildren, CSSProperties } from 'react'
import { Box } from './Box'

export const WrappedBox: FC<PropsWithChildren<CSSProperties>> = ({
  children,
  alignItems = 'center',
  justifyContent = 'center',
  padding = 100,
  ...rest
}) => (
  <Box alignItems={alignItems} justifyContent={justifyContent} padding={padding} {...rest}>
    {children}
  </Box>
)
