import React from 'react'
import * as S from './styles'

const EmptyModal = ({ open, setOpen }) => {
  if (open) {
    return (
      <S.Container data-testid='modal-testid'>
        <S.ModalContent>
          <S.ModalHeaderContent>
            <S.TitleContainer>Não há senhas disponíveis</S.TitleContainer>
          </S.ModalHeaderContent>

          <S.ModalBodyContent>
            <S.ButtonCancel
              onClick={() => {
                setOpen(false)
              }}
            >
              Fechar
            </S.ButtonCancel>
          </S.ModalBodyContent>
        </S.ModalContent>
      </S.Container>
    )
  } else {
    return <></>
  }
}

export default EmptyModal
