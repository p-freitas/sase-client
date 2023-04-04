import React, { useState } from 'react'
import Select from 'react-select'
import * as S from './styles'

const CallAgainModalAllPasswords = ({ open, setOpen, password, socket }) => {
  const [SelectValue, setSelectValue] = useState()
  const options = [
    { value: 'Guichê 01', label: 'Guichê 01' },
    { value: 'Consultório 02', label: 'Consultório 02' },
    { value: 'Mesa 03', label: 'Mesa 03' },
  ]

  const handleConfirmClick = () => {
    socket.emit('password.CallAgainAllPasswords', { password: password, select: SelectValue.value })
    setOpen(false)
    setSelectValue(null)
  }

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
              password?.includes('N') ? 'var(--green-high)' : 'var(--red-high)'
            }
          >
            {password}
          </S.CurrentPassword>

          <>
            <S.SelectText>
              Selecione o local para onde a pessoa irá se dirigir:
            </S.SelectText>
            <Select
              id='select'
              isClearable
              placeholder={'Selecione aqui'}
              options={options}
              onChange={el => setSelectValue(el)}
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
            <S.Button onClick={() => handleConfirmClick()}>Confirmar</S.Button>
          </S.ModalBodyContent>
        </S.ModalContent>
      </S.Container>
    )
  } else {
    return <></>
  }
}

export default CallAgainModalAllPasswords
