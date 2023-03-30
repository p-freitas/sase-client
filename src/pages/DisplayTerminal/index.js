import React, { useState, useEffect } from 'react'
import Container from '../../components/Container'
import io from 'socket.io-client'
import sound from '../../assets/notification.mp3'
import * as S from './style'

const socket = io(process.env.REACT_APP_SOCKET_URL, { transports: ['websocket'] })

socket.on('connect', () => console.log('[SOCKET] [DISPLAY] => New Connection'))

const DisplayTerminal = () => {
  const [password, setPassword] = useState()
  const [PasswordOnDisplay, setPasswordOnDisplay] = useState()
  
  socket.on('password.tv.update', (data, deleteFlag) => {
    setPassword(data)
    localStorage.setItem('currentPassword', data)
    !deleteFlag && new Audio(sound).play({volume: 0.1});
  })

  useEffect(() => {
    try {
      socket.emit('password.onDisplay')

      socket.on('object.passwordsOnDisplay', data => {
        setPasswordOnDisplay(data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <Container>
      <S.Wrapper>
        <S.Title>Senhas chamadas</S.Title>
        <S.CurrentPasswordContainer>
          {password
            ? password?.map(el => {
                return <S.CurrentPassword>{el}</S.CurrentPassword>
              })
            : PasswordOnDisplay?.map(el => {
                return <S.CurrentPassword>{el}</S.CurrentPassword>
              })}
        </S.CurrentPasswordContainer>
      </S.Wrapper>
    </Container>
  )
}

export default DisplayTerminal
