import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import sound from '../../assets/notification.mp3'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import * as S from './style'

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket'],
})

socket.on('connect', () => console.log('[SOCKET] [DISPLAY] => New Connection'))

const DisplayTerminal = () => {
  const [LastPassword, setLastPassword] = useState()
  const [SecondPassword, setSecondPassword] = useState()
  const [ThirdPassword, setThirdPassword] = useState()
  const [CurrentPassword, setCurrentPassword] = useState()
  const [currentTime, setCurrentTime] = useState(moment())
  const audioRef = useRef(null);

  socket.on('password.tv.update', (data, deleteFlag) => {
    if (audioRef.current && !deleteFlag) {
      audioRef.current.play();
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    try {
      socket.emit('password.onDisplay')

      socket.on('object.passwordsOnDisplay', data => {
        console.log(data);

        if (data.length > 0) {
          data[data.length - 4] && setLastPassword(data[data.length - 4])
          data[data.length - 3] && setSecondPassword(data[data.length - 3])
          data[data.length - 2] && setThirdPassword(data[data.length - 2])
          data[data.length - 1] && setCurrentPassword(data[data.length - 1])
        } else {
          setLastPassword(undefined)
          setSecondPassword(undefined)
          setThirdPassword(undefined)
          setCurrentPassword(undefined)
        }
        
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <S.ContainerDisplay>
      <audio ref={audioRef} src={sound} />
      <S.CurrentHour>
        {moment().locale('pt-br').format('LL')}
        {` às `}
        {currentTime.format('HH:mm')}
      </S.CurrentHour>
      <S.Wrapper>
        <S.CurrentPasswordContainer>
          <S.Title>Senha atual:</S.Title>
          {typeof CurrentPassword?.password === 'string' && (
            <S.CurrentPassword
              color={
                CurrentPassword && CurrentPassword.password?.includes('N')
                  ? 'var(--green-high)'
                  : 'var(--red-high)'
              }
            >
              {CurrentPassword && CurrentPassword.password}
            </S.CurrentPassword>
          )}
          <S.SubTitle>Por favor dirigir-se para:</S.SubTitle>
          <S.TitleSelect>
            {CurrentPassword && CurrentPassword?.select}
          </S.TitleSelect>
        </S.CurrentPasswordContainer>

        <S.LastPasswordContainer>
          <S.TitleLastPassword>Senhas anteriores:</S.TitleLastPassword>
          {ThirdPassword && (
            <>
              <S.LastPassword
                color={
                  ThirdPassword && ThirdPassword.password?.includes('N')
                    ? 'var(--green-high)'
                    : 'var(--red-high)'
                }
              >
                {ThirdPassword && ThirdPassword.password}
              </S.LastPassword>

              <S.SelectLastPassword>
                {ThirdPassword?.select}
              </S.SelectLastPassword>
            </>
          )}

          {SecondPassword && (
            <>
              <S.LastPassword
                color={
                  SecondPassword && SecondPassword.password?.includes('N')
                    ? 'var(--green-high)'
                    : 'var(--red-high)'
                }
              >
                {SecondPassword && SecondPassword.password}
              </S.LastPassword>

              <S.SelectLastPassword>
                {SecondPassword?.select}
              </S.SelectLastPassword>
            </>
          )}

          {LastPassword && (
            <>
              <S.LastPassword
                color={
                  LastPassword && LastPassword.password?.includes('N')
                    ? 'var(--green-high)'
                    : 'var(--red-high)'
                }
              >
                {LastPassword && LastPassword.password}
              </S.LastPassword>

              <S.SelectLastPassword>
                {LastPassword?.select}
              </S.SelectLastPassword>
            </>
          )}
        </S.LastPasswordContainer>
      </S.Wrapper>
    </S.ContainerDisplay>
  )
}

export default DisplayTerminal
