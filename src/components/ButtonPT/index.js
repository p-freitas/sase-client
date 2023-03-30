import React from 'react'

import { RedButton } from './styles'

const ButtonPT = ({ children, onClick }) => {
  return <RedButton onClick={onClick}>{children}</RedButton>
}

export default ButtonPT
