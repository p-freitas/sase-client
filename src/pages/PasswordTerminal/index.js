import React, { useState } from 'react'
import io from 'socket.io-client'
import Container from '../../components/Container'
import ButtonPT from '../../components/ButtonPT'
import * as S from './styles'

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket'],
})

socket.on('connect', () => console.log('[SOCKET] [USER] => New Connection'))

const PasswordTerminal = () => {
  const [currentPassword, setCurrentPassword] = useState()

  const selectPassword = category => {
    socket.emit('password.send', category)
  }

  socket.on('object.passwords', data => {
    const allPasswords = data['all']
    setCurrentPassword(allPasswords[allPasswords.length - 1])
  })

  const showText = () => {
    return (
      currentPassword && (
        <S.CurrentPasswordContainer>
          Sua senha: <S.CurrentPassword color={currentPassword && currentPassword.includes('N') ? 'var(--green-high)' : 'var(--red-high)'}>{currentPassword}</S.CurrentPassword>
        </S.CurrentPasswordContainer>
      )
    )
  }

  const showPassword = () => {
    return (
      <>
        <S.WrapperButtons>
          <>
            <ButtonPT color='var(--green-high)' onClick={() => selectPassword('normal')}>Normal</ButtonPT>
            <ButtonPT color='var(--red-high)' onClick={() => selectPassword('prioritary')}>
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
