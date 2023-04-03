import React, { useState } from 'react'
import * as S from './styles'
import Select from 'react-select'

const ConfirmationModal = ({
  message,
  subText,
  open,
  setOpen,
  password,
  modalFunction,
  type,
}) => {
  const [SelectValue, setSelectValue] = useState()
  const [ResetText, setResetText] = useState()
  const options = [
    { value: 'Guiche 01', label: 'Guiche 01' },
    { value: 'Consultório 02', label: 'Consultório 02' },
    { value: 'Mesa 03', label: 'Mesa 03' },
  ]
  const handleConfirmClick = () => {
    setSelectValue(null)
    setResetText(undefined)
    if (type === 'addButtonNext') {
      modalFunction({ select: SelectValue.value }, true)
    }
    if (type === 'add') {
      modalFunction({ password: password, select: SelectValue.value }, false)
    }
    if (type === 'reset') {
      modalFunction()
    }
  }

  if (open) {
    return (
      <S.Container data-testid='modal-testid'>
        <S.ModalContent>
          <S.ModalHeaderContent>
            <S.TitleContainer>{message}</S.TitleContainer>
          </S.ModalHeaderContent>

          {password && type === 'add' && (
            <S.CurrentPassword
              color={
                password.includes('N') ? 'var(--green-high)' : 'var(--red-high)'
              }
            >
              {password}
            </S.CurrentPassword>
          )}
          {subText && <S.SubText>{subText}</S.SubText>}

          {(type === 'add' || type === 'addButtonNext') && (
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
          )}

          {type === 'reset' && (
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
          )}

          <S.ModalBodyContent>
            <S.ButtonCancel
              onClick={() => {
                setSelectValue(null)
                setResetText(undefined)
                setOpen(false)
              }}
            >
              Cancelar
            </S.ButtonCancel>
            <S.Button
              onClick={() => handleConfirmClick()}
              disabled={
                (SelectValue !== undefined && SelectValue !== null) ||
                ResetText === 'APAGAR'
                  ? false
                  : true
              }
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

export default ConfirmationModal
