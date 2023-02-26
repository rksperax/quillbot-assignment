import type React from 'react'
import { IconProps } from './IconProps'

export const IconClose = ({
  className = ''
}: IconProps): React.ReactElement => {
  return (
    <svg className={className} viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 1.51071L13.4893 0L7.5 5.98929L1.51071 0L0 1.51071L5.98929 7.5L0 13.4893L1.51071 15L7.5 9.01071L13.4893 15L15 13.4893L9.01071 7.5L15 1.51071Z" fill="currentColor" />
    </svg>
  )
}
