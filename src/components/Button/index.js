import React from 'react'

import { RedButton } from './styles'

const Button = ({ children, onClick, type }) => {
  return <RedButton type={type} onClick={onClick}>{children}</RedButton>
}

export default Button
