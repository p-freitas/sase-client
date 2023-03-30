import React, { useState } from 'react'
import io from 'socket.io-client'
import Container from '../../components/Container'
import ButtonPT from '../../components/ButtonPT'
import * as S from './styles'

const socket = io(process.env.REACT_APP_SOCKET_URL, { transports: ['websocket'] })

socket.on('connect', () => console.log('[SOCKET] [USER] => New Connection'))

const PasswordTerminal = () => {
  const [currentPassword, setCurrentPassword] = useState()
  const [thanksButton, setThanksButton] = useState(false)

  const selectPassword = category => {
    socket.emit('password.send', category)
    setThanksButton(true)
  }

  socket.on('object.passwords', data => {
    const allPasswords = data['all']
    setCurrentPassword(allPasswords[allPasswords.length - 1])
  })

  const showText = () => {
    return (
      thanksButton && (
        <S.CurrentPasswordContainer>
          Sua senha: <S.CurrentPassword>{currentPassword}</S.CurrentPassword>
        </S.CurrentPasswordContainer>
      )
    )
  }

  const showPassword = () => {
    return (
      <>
        <S.WrapperButtons>
          <>
            <ButtonPT onClick={() => selectPassword('normal')}>Normal</ButtonPT>
            <ButtonPT onClick={() => selectPassword('prioritary')}>
              Prioritário
            </ButtonPT>
          </>
        </S.WrapperButtons>
        {showText()}
      </>
    )
  }

  return (
    <Container>
      <S.Wrapper>
        <S.SelectTypeText>Selecione o tipo da senha: </S.SelectTypeText>
        {showPassword()}
      </S.Wrapper>
    </Container>
  )
}

export default PasswordTerminal
