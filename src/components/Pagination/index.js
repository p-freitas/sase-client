import React, { useState } from 'react'
import * as S from './styles'

const Pagination = ({ itemsPerPage, data, func }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const maxPage = Math.ceil(data?.all.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentItems = data?.all.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  return (
    <div>
      {data?.all?.length > 0 ? (
        currentItems.map(item => (
          <S.ListPasswordButton
            type={item?.includes('N') ? 'normal' : 'prioritary'}
            onClick={() => func(item)}
          >
            {item}
          </S.ListPasswordButton>
        ))
      ) : (
        <S.NoMorePasswordsText>Não há senhas disponíveis</S.NoMorePasswordsText>
      )}

      {data?.all?.length > 0 && (
        <S.PaginationContainer>
          <S.Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </S.Button>
          <S.Button onClick={handleNextPage} disabled={currentPage === maxPage}>
            Próximo
          </S.Button>
        </S.PaginationContainer>
      )}
    </div>
  )
}

export default Pagination
