import React, { useState, useEffect } from 'react'
import Container from '../../components/Container'
import io from 'socket.io-client'
import sound from '../../assets/notification.mp3'
import * as S from './style'

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket'],
})

socket.on('connect', () => console.log('[SOCKET] [DISPLAY] => New Connection'))

const DisplayTerminal = () => {
  const [PasswordOnDisplay, setPasswordOnDisplay] = useState()

  socket.on('password.tv.update', (data, deleteFlag) => {
    !deleteFlag && new Audio(sound).play({ volume: 0.1 })
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
          {PasswordOnDisplay?.map(el => {
            return (
              typeof el?.password === 'string' && (
                <S.CurrentPassword
                  color={
                    el && el?.password?.includes('N')
                      ? 'var(--green-high)'
                      : 'var(--red-high)'
                  }
                >
                  {el.password}
                </S.CurrentPassword>
              )
            )
          })}
        </S.CurrentPasswordContainer>
      </S.Wrapper>
    </Container>
  )
}

export default DisplayTerminal
