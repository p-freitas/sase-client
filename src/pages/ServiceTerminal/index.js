import React, { useState, useEffect } from 'react'
import Container from '../../components/Container/index'
import io from 'socket.io-client'
import { ReloadIcon } from '../../assets/icons/ReloadIcon'
import ConfirmationModal from '../../components/ConfirmationModal'
import EmptyModal from '../../components/EmptyModal'
import CallAgainModal from '../../components/CallAgainModal'
import ResetModal from '../../components/ResetModal'
import Switch from 'react-switch'
import { v4 as uuid } from 'uuid'
import Pagination from '../../components/Pagination'
import Loading from '../../components/Loading'
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
  const [OpenCallAgainModal, setOpenCallAgainModal] = useState(false)
  const [OpenResetModal, setOpenResetModal] = useState(false)
  const [ModalFunction, setModalFunction] = useState()
  const [ModalPassword, setModalPassword] = useState()
  const [ModalMessage, setModalMessage] = useState()
  const [ModalSubText, setModalSubText] = useState()
  const [ModalType, setModalType] = useState()
  const [SwitchCheck, setSwitchCheck] = useState(false)
  const [LoadingPasswordListOnDisplay, setLoadingPasswordListOnDisplay] =
    useState(false)

  // const [password, setPassword] = useState()
  const [PasswordCallAgainModal, setPasswordCallAgainModal] = useState()
  const id = uuid()
  useEffect(() => {
    setLoadingPasswordListOnDisplay(true)
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
          setLoadingPasswordListOnDisplay(false)
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

  socket.on(`password.tv.service.${id}`, data => {
    // setPassword(data)
    localStorage.setItem('currentPassword', data)
  })

  socket.on(`passwords.reset`, () => {
    localStorage.removeItem('currentPassword')
  })

  const handleNextPassword = (el, isNextPassword) => {
    if (isNextPassword) {
      socket.emit('password.next', el, isNextPassword, id)

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

        socket.emit('password.next', el, isNextPassword, id)
        socket.emit('password.onDisplay', PasswordListOnDisplay)
      }

      if (
        !PasswordListOnDisplay?.password?.includes(el?.password) &&
        !firstUse
      ) {
        const newList = [...PasswordListOnDisplay, el]
        var filter = newList.filter(e => e.length)
        setPasswordListOnDisplay(filter)

        socket.emit('password.next', el, isNextPassword, id)
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

  // const handleDeletePasswordOnDisplay = el => {
  //   socket.emit('passwords.deleteOnDisplay', el)
  //   setOpenModal(false)
  // }

  const handleOpenModal = (message, subText, func) => {
    socket.emit(`password.getEmpty`, id)
    socket.on(`password.empty.${id}`, data => {
      if (data && ModalType !== 'again' && ModalType !== 'reset') {
        setOpenEmptyModal(true)
      } else {
        setOpenModal(true)
        setModalMessage(message)
        setModalSubText(subText)
        setModalFunction(func)
      }
    })
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

  const handleOpenEmptyModal = () => {
    setOpenEmptyModal(true)
  }

  return (
    <>
      <Container>
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
        <S.ServiceTerminalContainer>
          {SwitchCheck ? (
            <S.WrapperList>
              <h1>Pressione para chamar a senha: </h1>
              <S.PasswordsListContainer>
                <Pagination
                  itemsPerPage={15}
                  data={PasswordList}
                  func={handleListButtonClick}
                />
              </S.PasswordsListContainer>

              {localStorage.getItem('currentPassword') &&
                localStorage.getItem('currentPassword') !== 'null' && (
                  <S.CurrentPasswordAttending>
                    <h1>Você está atendendo a senha: </h1>
                    <S.CurrentPasswordButtonNext
                      color={
                        localStorage.getItem('currentPassword').includes('N')
                          ? 'var(--green-high)'
                          : 'var(--red-high)'
                      }
                    >
                      {localStorage.getItem('currentPassword')}
                    </S.CurrentPasswordButtonNext>
                  </S.CurrentPasswordAttending>
                )}
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
              {localStorage.getItem('currentPassword') &&
                localStorage.getItem('currentPassword') !== 'null' && (
                  <>
                    <h1>Você está atendendo a senha: </h1>
                    <S.CurrentPasswordButtonNext
                      color={
                        localStorage.getItem('currentPassword').includes('N')
                          ? 'var(--green-high)'
                          : 'var(--red-high)'
                      }
                    >
                      {localStorage.getItem('currentPassword')}
                    </S.CurrentPasswordButtonNext>
                  </>
                )}
            </S.WrapperButton>
          )}

          <S.WrapperOnDisplay>
            <S.OnDisplayContainer>
              <S.OnDisplayText>
                Senhas que estão sendo exibidas na TV:{' '}
              </S.OnDisplayText>
              <p>(Clique na senha para chama-la novamente)</p>
              {PasswordListOnDisplay &&
                PasswordListOnDisplay[0] !== [] &&
                (LoadingPasswordListOnDisplay ? (
                  <Loading />
                ) : (
                  <S.PasswordsContainer>
                    {PasswordListOnDisplay?.map(el => {
                      return (
                        el.password !== undefined && (
                          <S.CurrentPasswordContainer>
                            <S.SvgContainer>
                              <ReloadIcon />
                            </S.SvgContainer>
                            <S.CurrentPassword
                              color={
                                el && el?.password?.includes('N')
                                  ? 'var(--green-high)'
                                  : 'var(--red-high)'
                              }
                              onClick={() => {
                                setPasswordCallAgainModal(el)
                                setOpenCallAgainModal(true)
                              }}
                            >
                              {el?.password}
                            </S.CurrentPassword>
                          </S.CurrentPasswordContainer>
                        )
                      )
                    })}
                  </S.PasswordsContainer>
                ))}
            </S.OnDisplayContainer>
            <S.ResetContainer>
              <p>(Clique para resetar todas as senhas)</p>
              <S.ResetButton
                onClick={() => {
                  setOpenResetModal(true)
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
        passwordList={PasswordList}
        setOpenEmptyModal={handleOpenEmptyModal}
      />
      <EmptyModal open={OpenEmptyModal} setOpen={setOpenEmptyModal} />
      <CallAgainModal
        open={OpenCallAgainModal}
        setOpen={setOpenCallAgainModal}
        password={PasswordCallAgainModal}
        socket={socket}
        id={id}
      />
      <ResetModal
        open={OpenResetModal}
        setOpen={setOpenResetModal}
        socket={socket}
      />
    </>
  )
}

export default ServiceTerminal
