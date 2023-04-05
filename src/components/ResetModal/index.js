import React, { useState } from 'react'
import * as S from './styles'

const ResetModal = ({ open, setOpen, password, socket }) => {
  const [ResetText, setResetText] = useState()
  if (open) {
    return (
      <S.Container data-testid='modal-testid'>
        <S.ModalContent>
          <S.ModalHeaderContent>
            <S.TitleContainer>Deseja apagar as senhas?</S.TitleContainer>
          </S.ModalHeaderContent>

          <S.SubText>
            Isso irá apagar todas as senhas geradas. Recomendado apenas apagar
            no final do dia
          </S.SubText>

          <>
            <S.ResetTextContainer>
              <S.SelectText>Digite abaixo a palavra</S.SelectText>
              <S.SelectTextBold>{` apagar `}</S.SelectTextBold>
              <S.SelectText>para apagar todas as senhas: </S.SelectText>
            </S.ResetTextContainer>
            <S.ResetInput
              onChange={e => setResetText(e.target.value.toUpperCase())}
            />
          </>

          <S.ModalBodyContent>
            <S.ButtonCancel
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancelar
            </S.ButtonCancel>
            <S.Button
              disabled={ResetText !== 'APAGAR'}
              onClick={() => {
                localStorage.removeItem('currentPassword')
                socket.emit('passwords.reset')
                socket.emit('password.next', [])

                window.location.reload()
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

export default ResetModal
