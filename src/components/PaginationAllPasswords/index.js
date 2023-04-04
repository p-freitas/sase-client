import React, { useState } from 'react'
import CallAgainModalAllPasswords from '../../components/CallAgainModalAllPasswords'
import * as S from './styles'

const PaginationAllPasswords = ({ itemsPerPage, data, socket }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [PasswordCallAgainModal, setPasswordCallAgainModal] = useState()
  const [OpenCallAgainModal, setOpenCallAgainModal] = useState(false)

  console.log('data:::', data)

  const maxPage = Math.ceil(data?.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentItems = data?.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  return (
    <S.PaginationAllPasswordsContainer>
      {data?.length > 0 ? (
        currentItems.map(item => (
          <S.ListPasswordButton
            type='normal'
            onClick={() => {
              setPasswordCallAgainModal(item)
              setOpenCallAgainModal(true)
            }}
          >
            {item}
          </S.ListPasswordButton>
        ))
      ) : (
        <S.NoMorePasswordsText>Não há senhas disponíveis</S.NoMorePasswordsText>
      )}

      {data?.length > 0 && (
        <S.PaginationContainer>
          <S.Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </S.Button>
          <S.Button onClick={handleNextPage} disabled={currentPage === maxPage}>
            Próximo
          </S.Button>
        </S.PaginationContainer>
      )}
      <CallAgainModalAllPasswords
        open={OpenCallAgainModal}
        setOpen={setOpenCallAgainModal}
        password={PasswordCallAgainModal}
        socket={socket}
      />
    </S.PaginationAllPasswordsContainer>
  )
}

export default PaginationAllPasswords
