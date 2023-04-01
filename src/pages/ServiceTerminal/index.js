import React, { useState, useEffect } from 'react'
import Container from '../../components/Container/index'
import Button from '../../components/Button/index'
import io from 'socket.io-client'
import { TrashIcon } from '../../assets/icons/TrashIcon'
import ConfirmationModal from '../../components/ConfirmationModal'
import * as S from './styles'

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket'],
})

socket.on('connect', () => {
  console.log('[SOCKET] [SERVICE] => New Connection')
})

const ServiceTerminal = () => {
  const [PasswordList, setPasswordList] = useState()
  const [PasswordListOnDisplay, setPasswordListOnDisplay] = useState()
  const [firstUse, setFirstUse] = useState(false)
  const [OpenModal, setOpenModal] = useState(false)
  const [ModalFunction, setModalFunction] = useState()
  const [ModalPassword, setModalPassword] = useState()
  const [ModalMessage, setModalMessage] = useState()
  const [ModalSubText, setModalSubText] = useState()
  const [ModalColor, setModalColor] = useState()

  useEffect(() => {
    try {
      socket.emit('password.get')
    } catch (error) {
      console.log(error)
    }

    if (PasswordListOnDisplay !== null) {
      try {
        socket.emit('password.onDisplay')

        socket.on('object.passwordsOnDisplay', data => {
          if (data) setPasswordListOnDisplay(data)
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
    console.log(el)
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
      var filter = newList.filter(e => e.length)
      setPasswordListOnDisplay(filter)

      socket.emit('password.next', el)
      socket.emit('password.onDisplay', PasswordListOnDisplay)
    }

    handleDeletePassword(el)
    setOpenModal(false)
  }

  const handleDeletePassword = el => {
    console.log('entrou');
    socket.emit('passwords.delete', el)
    socket.on('object.passwords', data => {
      setPasswordList(data)
    })
  }

  const handleDeletePasswordOnDisplay = el => {
    socket.emit('passwords.deleteOnDisplay', el)
    setOpenModal(false)
  }

  const handleOpenModal = (el, message, subText, func) => {
    setOpenModal(true)
    setModalMessage(message)
    setModalSubText(subText)
    setModalPassword(el)
    setModalFunction(func)
    setModalColor(el.includes('N') ? 'var(--green-high)' : 'var(--red-high)')
  }

  const handleResetPasswords = () => {
    console.log('dasasdasdsa')
    socket.emit('passwords.reset')
    socket.emit('password.next', [])
    setPasswordListOnDisplay([])

    window.location.reload()
  }

  return (
    <>
      <Container>
        <S.ServiceTerminalContainer>
          <S.Wrapper>
            <h1>Selecione as senhas que apareceram na TV: </h1>
            <S.PasswordsContainer>
              {PasswordList?.prioritary?.map(el => {
                console.log('PasswordList:::', PasswordList)
                return (
                  <Button
                    type='prioritary'
                    onClick={() =>
                      handleOpenModal(
                        el,
                        'Deseja exibir essa senha na tv?',
                        '',
                        () => handleNextPassword
                      )
                    }
                  >
                    {el}
                  </Button>
                )
              })}
              {PasswordList?.normal?.map(el => {
                console.log('PasswordList:::', PasswordList)
                return (
                  <Button
                    type='normal'
                    onClick={() =>
                      handleOpenModal(
                        el,
                        'Deseja exibir essa senha na tv?',
                        '',
                        () => handleNextPassword
                      )
                    }
                  >
                    {el}
                  </Button>
                )
              })}
            </S.PasswordsContainer>
          </S.Wrapper>
          <S.WrapperOnDisplay>
            <S.OnDisplayContainer>
              <S.OnDisplayText>
                Senhas que estão sendo exibidas na TV:{' '}
              </S.OnDisplayText>
              <p>(Clique na senha para removê-la da TV)</p>
              {PasswordListOnDisplay && PasswordListOnDisplay[0] !== [] && (
                <S.PasswordsContainer>
                  {PasswordListOnDisplay?.map(el => {
                    return (
                      <S.CurrentPasswordContainer>
                        <S.SvgContainer>
                          <TrashIcon />
                        </S.SvgContainer>
                        <S.CurrentPassword
                          color={
                            el && el.includes('N')
                              ? 'var(--green-high)'
                              : 'var(--red-high)'
                          }
                          onClick={() =>
                            handleOpenModal(
                              el,
                              'Deseja remover essa senha na tv?',
                              '',
                              () => handleDeletePasswordOnDisplay
                            )
                          }
                        >
                          {el}
                        </S.CurrentPassword>
                      </S.CurrentPasswordContainer>
                    )
                  })}
                </S.PasswordsContainer>
              )}
            </S.OnDisplayContainer>
            <S.ResetContainer>
              <p>(Clique para resetar todas as senhas)</p>
              <S.ResetButton
                onClick={() =>
                  handleOpenModal(
                    '',
                    'Deseja resetar as senhas?',
                    'Isso irá resetar todas as senhas geradas. Recomendado apenas resetar no final do dia',
                    () => handleResetPasswords
                  )
                }
              >
                Resetar senhas
              </S.ResetButton>
            </S.ResetContainer>
          </S.WrapperOnDisplay>
        </S.ServiceTerminalContainer>
      </Container>
      <ConfirmationModal
        open={OpenModal}
        setOpen={setOpenModal}
        password={ModalPassword}
        message={ModalMessage}
        modalFunction={ModalFunction}
        subText={ModalSubText}
        modalColor={ModalColor}
      />
    </>
  )
}

export default ServiceTerminal
