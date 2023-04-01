import React from 'react'
import * as S from './styles'

const ConfirmationModal = ({
  message,
  subText,
  open,
  setOpen,
  password,
  modalFunction,
  modalColor
}) => {
  if (open) {
    return (
      <S.Container data-testid='modal-testid'>
        <S.ModalContent>
          <S.ModalHeaderContent>
            <S.TitleContainer>{message}</S.TitleContainer>
          </S.ModalHeaderContent>

          {password && <S.CurrentPassword color={modalColor}>{password}</S.CurrentPassword>}
          {subText && <S.SubText>{subText}</S.SubText>}

          <S.ModalBodyContent>
            <S.ButtonCancel onClick={() => setOpen(false)}>
              Cancelar
            </S.ButtonCancel>
            <S.Button onClick={() => modalFunction(password)}>
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

export default ConfirmationModal
