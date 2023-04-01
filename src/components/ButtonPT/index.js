import React from 'react'

import { RedButton } from './styles'

const ButtonPT = ({ children, onClick, color }) => {
  return <RedButton color={color} onClick={onClick}>{children}</RedButton>
}

export default ButtonPT
