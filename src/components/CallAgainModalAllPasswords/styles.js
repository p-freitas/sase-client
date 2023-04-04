import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;

  @media only screen and (max-device-width: 767px) {
    margin: ;
  }

  width: ${({ fullScreen, width }) => (fullScreen ? '100%' : width)};
  height: ${({ fullScreen, height }) => (fullScreen ? '100vh' : height)};
  background-color: white;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.07),
    0px 0px 10px rgba(0, 0, 0, 0.05);
  border-radius: ${({ fullScreen }) => (fullScreen ? '0px' : '10px')};
  overflow-y: auto;
  align-items: center;
  max-width: 600px;
  padding: 20px;
  justify-content: space-between;

  #select {
    width: 300px;
    color: black;
    margin-bottom: 80px;
  }
`

export const ArrowBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0px;
`

export const CloseBtn = styled.button`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  cursor: pointer;
  align-items: center;
  background-color: transparent;
  border: 0px;
`

// export const CloseIcon = styled(Icon)`
//   font-size: 1em;
// `

export const ModalHeaderContent = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  align-content: center;
`

export const ModalBodyContent = styled.div`
  display: flex;
`

export const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: black;
  font-size: 30px;
`

export const Button = styled.button`
  border-radius: 5px;
  text-transform: uppercase;

  padding: 0 10px;
  color: var(--white);
  height: 40px;
  width: 200px;
  background-color: var(--green-high);
  transition: 0.5s;
  cursor: pointer;
  margin: 10px;
  font-size: 25px;
  border: 1px solid black;

  &:hover {
    background-color: var(--green-strong);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;

    &:hover {
      background-color: #cccccc;
    }
  }
`

export const ButtonCancel = styled.button`
  border-radius: 5px;
  text-transform: uppercase;

  padding: 0 10px;
  color: var(--white);
  height: 40px;
  width: 200px;
  background-color: #ccc;
  transition: 0.5s;
  cursor: pointer;
  margin: 10px;
  font-size: 25px;
  border: 1px solid black;

  &:hover {
    background-color: var(--red-strong);
  }
`

export const CurrentPassword = styled.p`
  font-size: 40px;
  color: ${({ color }) => color};
  border: 1px solid;
  margin: 5px;
  padding: 5px;
`

export const SubText = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: var(--red-high);
  margin: 5px;
  padding: 5px;
  text-align: center;
  margin: 20px;
`

export const SelectText = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: black;
  margin: 5px;
  padding: 5px;
  text-align: center;
`

export const SelectTextBold = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 5px 0;
  padding: 5px 0;
  text-align: center;
`

export const ResetTextContainer = styled.div`
  display: flex;
`

export const ResetInput = styled.input`
  border: unset;
  border-bottom: 1px solid;
  font-size: 16px;
  width: 70px;
`
