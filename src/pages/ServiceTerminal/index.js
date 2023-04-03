import React, { useState, useEffect } from 'react'
import Container from '../../components/Container/index'
import io from 'socket.io-client'
import { TrashIcon } from '../../assets/icons/TrashIcon'
import ConfirmationModal from '../../components/ConfirmationModal'
import EmptyModal from '../../components/EmptyModal'
import Switch from 'react-switch'

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
  const [OpenEmptyModal, setOpenEmptyModal] = useState(false)
  const [ModalFunction, setModalFunction] = useState()
  const [ModalPassword, setModalPassword] = useState()
  const [ModalMessage, setModalMessage] = useState()
  const [ModalSubText, setModalSubText] = useState()
  const [ModalType, setModalType] = useState()
  const [SwitchCheck, setSwitchCheck] = useState(false)

  const [password, setPassword] = useState()
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

  socket.on(`password.tv.service`, data => {
    setPassword(data)
  })

  const handleNextPassword = (el, isNextPassword) => {
    if (isNextPassword) {
      socket.emit('password.next', el, isNextPassword)

      setOpenModal(false)
    } else {
      if (PasswordListOnDisplay === undefined) {
        setFirstUse(true)
      } else {
        setFirstUse(false)
      }

      if (firstUse) {
        const newList = [...PasswordListOnDisplay, el]
        setPasswordListOnDisplay(newList)

        socket.emit('password.next', el, isNextPassword)
        socket.emit('password.onDisplay', PasswordListOnDisplay)
      }

      if (
        !PasswordListOnDisplay?.password?.includes(el?.password) &&
        !firstUse
      ) {
        const newList = [...PasswordListOnDisplay, el]
        var filter = newList.filter(e => e.length)
        setPasswordListOnDisplay(filter)

        socket.emit('password.next', el)
        socket.emit('password.onDisplay', PasswordListOnDisplay)
      }

      setOpenModal(false)
    }

    handleDeletePassword(el?.password)
  }

  const handleDeletePassword = el => {
    socket.emit('passwords.delete', el)
    socket.on('object.passwords', data => {
      setPasswordList(data)
    })
  }

  const handleDeletePasswordOnDisplay = el => {
    socket.emit('passwords.deleteOnDisplay', el)
    setOpenModal(false)
  }

  const handleOpenModal = (message, subText, func) => {
    socket.emit('password.getEmpty')
    socket.on('password.empty', data => {
      if (data) {
        setOpenEmptyModal(true)
      } else {
        setOpenModal(true)
        setModalMessage(message)
        setModalSubText(subText)
        setModalFunction(func)
      }
    })
  }

  const handleResetPasswords = () => {
    socket.emit('passwords.reset')
    socket.emit('password.next', [])
    setPasswordListOnDisplay([])

    window.location.reload()
  }

  const handleSwitchChange = () => {
    setSwitchCheck(!SwitchCheck)
  }

  const handleListButtonClick = el => {
    setModalPassword(el)
    setModalType('add')
    handleOpenModal(
      'Deseja exibir essa senha na tv?',
      '',
      () => handleNextPassword
    )
  }

  return (
    <>
      <S.SwitchButtonContainer>
        <S.SwitchButtonText>
          Ative para exibir a listagem das senhas
        </S.SwitchButtonText>
        <Switch
          onChange={() => handleSwitchChange()}
          checked={SwitchCheck}
          uncheckedIcon={false}
          checkedIcon={false}
          width={40}
          height={20}
          handleDiameter={18}
        />
      </S.SwitchButtonContainer>
      <Container>
        <S.ServiceTerminalContainer>
          {SwitchCheck ? (
            <S.WrapperList>
              <h1>Selecione as senhas que apareceram na TV: </h1>
              <S.PasswordsContainer>
                {PasswordList?.prioritary?.map(el => {
                  return (
                    <S.ListPasswordButton
                      type='prioritary'
                      onClick={() => handleListButtonClick(el)}
                    >
                      {el}
                    </S.ListPasswordButton>
                  )
                })}
                {PasswordList?.normal?.map(el => {
                  return (
                    <S.ListPasswordButton
                      type='normal'
                      onClick={() => handleListButtonClick(el)}
                    >
                      {el}
                    </S.ListPasswordButton>
                  )
                })}
              </S.PasswordsContainer>
            </S.WrapperList>
          ) : (
            <S.WrapperButton>
              <h1>Pressione o botão para chamar a próxima senha: </h1>
              {/* <Button onClick={() => handleNextPassword(undefined, true)}> */}
              <S.NextPasswordButton
                onClick={() => {
                  setModalType('addButtonNext')
                  handleOpenModal(
                    'Deseja chamar a próxima senha?',
                    '',
                    () => handleNextPassword
                  )
                }}
              >
                Próxima senha
              </S.NextPasswordButton>
              {password && (
                <>
                  <h1>Você está atendendo a senha: </h1>
                  <S.CurrentPassword
                    color={
                      password.includes('N')
                        ? 'var(--green-high)'
                        : 'var(--red-high)'
                    }
                  >
                    {password}
                  </S.CurrentPassword>
                </>
              )}
            </S.WrapperButton>
          )}

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
                      el.password !== undefined && (
                        <S.CurrentPasswordContainer>
                          <S.SvgContainer>
                            <TrashIcon />
                          </S.SvgContainer>
                          <S.CurrentPassword
                            color={
                              el && el?.password?.includes('N')
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
                            {el?.password}
                          </S.CurrentPassword>
                        </S.CurrentPasswordContainer>
                      )
                    )
                  })}
                </S.PasswordsContainer>
              )}
            </S.OnDisplayContainer>
            <S.ResetContainer>
              <p>(Clique para resetar todas as senhas)</p>
              <S.ResetButton
                onClick={() => {
                  setModalType('reset')
                  handleOpenModal(
                    'Deseja apagar as senhas?',
                    'Isso irá apagar todas as senhas geradas. Recomendado apenas apagar no final do dia',
                    () => handleResetPasswords
                  )
                }}
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
        type={ModalType}
      />
      <EmptyModal open={OpenEmptyModal} setOpen={setOpenEmptyModal} />
    </>
  )
}

export default ServiceTerminal
