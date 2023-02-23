import { FC, PropsWithChildren, CSSProperties } from 'react'

export const Box: FC<PropsWithChildren<CSSProperties>> = ({
  children,
  display = 'flex',
  flexDirection = 'column',
  justifyContent,
  ...rest
}) => <div style={{ display, flexDirection, justifyContent, ...rest }}>{children}</div>
