import React, { useState, useEffect } from 'react'
import Container from '../../components/Container/index'
import Button from '../../components/Button/index'
import io from 'socket.io-client'
import * as S from './styles'

const socket = io(process.env.REACT_APP_SOCKET_URL, { transports: ['websocket'] })

socket.on('connect', () => {
  console.log('[SOCKET] [SERVICE] => New Connection')
})

const ServiceTerminal = () => {
  const [PasswordList, setPasswordList] = useState()
  const [PasswordListOnDisplay, setPasswordListOnDisplay] = useState([])
  const [firstUse, setFirstUse] = useState(false)

  useEffect(() => {
    try {
      socket.emit('password.get')
    } catch (error) {
      console.log(error)
    }

    if(PasswordListOnDisplay !== null){
      try {
        socket.emit('password.onDisplay')
  
        socket.on('object.passwordsOnDisplay', data => {
          if(data) setPasswordListOnDisplay(data)
        })
      } catch (error) {
        console.log(error)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  socket.on('object.passwords', data => {
    setPasswordList(data)
  })


  const handleNextPassword = el => {
    if (PasswordListOnDisplay === undefined) {
      setFirstUse(true)
    } else {
      setFirstUse(false)
    }

    if (firstUse) {
      const newList = [...PasswordListOnDisplay, el]
      setPasswordListOnDisplay(newList)

      socket.emit('password.next', el)
      socket.emit('password.onDisplay', PasswordListOnDisplay)
    }

    if (!PasswordListOnDisplay?.includes(el) && !firstUse) {
      const newList = [...PasswordListOnDisplay, el]
      setPasswordListOnDisplay(newList)

      socket.emit('password.next', el)
      socket.emit('password.onDisplay', PasswordListOnDisplay)
    }
  }
  
  const handleDeletePassword = el => {
    socket.emit('passwords.deleteOnDisplay', el)
  }

  return (
    <Container>
      <S.ServiceTerminalContainer>
      <S.Wrapper>
        <h1>Selecione as senhas que apareceram na TV: </h1>
        <S.PasswordsContainer>
          {PasswordList?.all?.map(el => {
            return <Button onClick={() => handleNextPassword(el)}>{el}</Button>
          })}
        </S.PasswordsContainer>
      </S.Wrapper>
      <S.Wrapper>
        <S.OnDisplayContainer>
        <h1>Senhas que estão sendo exibidas na TV: </h1>
        <S.PasswordsContainer>
          {PasswordListOnDisplay?.map(el => {
            return <S.CurrentPassword onClick={() => handleDeletePassword(el)}>{el}</S.CurrentPassword>
            
          })}
        </S.PasswordsContainer>
        </S.OnDisplayContainer>
      </S.Wrapper>
      </S.ServiceTerminalContainer>
    </Container>
  )
}

export default ServiceTerminal
