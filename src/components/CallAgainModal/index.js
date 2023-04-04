import React from 'react'
import * as S from './styles'

const CallAgainModal = ({ open, setOpen, password, socket }) => {
  if (open) {
    return (
      <S.Container data-testid='modal-testid'>
        <S.ModalContent>
          <S.ModalHeaderContent>
            <S.TitleContainer>
              Deseja chamar essa senha novamente?
            </S.TitleContainer>
          </S.ModalHeaderContent>

          <S.CurrentPassword
            color={
              password?.password?.includes('N')
                ? 'var(--green-high)'
                : 'var(--red-high)'
            }
          >
            {password?.password}
          </S.CurrentPassword>

          <S.ModalBodyContent>
            <S.ButtonCancel
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancelar
            </S.ButtonCancel>
            <S.Button
              onClick={() => {
                socket.emit('password.callAgain', password)
                setOpen(false)
              }}
            >
              Confirmar
            </S.Button>
          </S.ModalBodyContent>
        </S.ModalContent>
      </S.Container>
    )
  } else {
    return <></>
  }
}

export default CallAgainModal
