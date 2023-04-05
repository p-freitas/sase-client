import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import PaginationAllPasswords from '../../components/PaginationAllPasswords'
import Loading from '../../components/Loading'
import * as S from './style'

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket'],
})

socket.on('connect', () => {
  console.log('[SOCKET] [SERVICE] => New Connection')
})

const OldPasswords = () => {
  const [AllPasswordList, setAllPasswordList] = useState()
  const [LoadingOldPasswords, setLoadingOldPasswords] = useState(false)
  useEffect(() => {
    setLoadingOldPasswords(true)
    try {
      socket.emit('password.getAll')

      socket.on('password.sendAll', data => {
        if (data) setAllPasswordList(data)
        setLoadingOldPasswords(false)
      })
    } catch (error) {
      console.log(error)
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('LoadingOldPasswords::', LoadingOldPasswords)

  return (
    <S.Container>
      <S.AllPasswordsTitle>
        Todas as senhas geradas do dia:{' '}
      </S.AllPasswordsTitle>
      <p>(clique para chamar a senha)</p>
      {LoadingOldPasswords ? (
        <Loading/>
      ) : (
        <S.PasswordsListContainer>
          <PaginationAllPasswords
            itemsPerPage={20}
            data={AllPasswordList}
            socket={socket}
            // func={handleListButtonClick}
          />
        </S.PasswordsListContainer>
      )}
    </S.Container>
  )
}

export default OldPasswords
