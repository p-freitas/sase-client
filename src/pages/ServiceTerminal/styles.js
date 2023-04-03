import styled from 'styled-components'

export const WrapperList = styled.section`
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  width: 80%;
  overflow-y: auto;
`

export const WrapperButton = styled.section`
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  width: 80%;
  overflow-y: auto;
`

export const WrapperOnDisplay = styled.section`
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  width: 20%;
  border: 1px solid;
  overflow-y: auto;
`

export const CurrentPassword = styled.p`
  font-size: 40px;
  color: ${({ color }) => color};
  border: 1px solid;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
`

export const PasswordsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;

  svg {
    fill: var(--red-high);
    position: absolute;
    width: 17px;
    background-color: white;
    border-radius: 50px;
    height: 20px;
    cursor: pointer;
    display: none;
  }
`

export const SwitchButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ServiceTerminalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  padding-top: 20px;
`

export const OnDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 85%;
  overflow-y: auto;
`

export const OnDisplayText = styled.h1`
  text-align: center;
`

export const CurrentPasswordContainer = styled.div`
  &:hover {
    svg {
      display: block;
    }
  }
`

export const SvgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ResetContainer = styled.div`
  width: 100%;
  height: 15%;
  border: 1px solid;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ResetButton = styled.button`
  border-radius: 5px;
  text-transform: uppercase;

  padding: 0 10px;
  color: var(--white);
  width: 200px;
  background-color: var(--red-high);
  transition: 0.5s;
  cursor: pointer;
  margin: 10px;
  font-size: 25px;
  border: 1px solid black;

  &:hover {
    background-color: var(--red-strong);
  }

  @media only screen and (max-width: 1200px) {
    width: 100px;
    font-size: 16px;
  }
`

export const SwitchButtonText = styled.span`
  color: white;
`

export const NextPasswordButton = styled.button`
  border-radius: 5px;
  text-transform: uppercase;

  padding: 0 10px;
  color: var(--white);
  height: 60px;
  width: 200px;
  background-color: ${({ type }) =>
    type === 'normal' ? 'var(--green-high)' : 'var(--red-high)'};
  transition: 0.5s;
  cursor: pointer;
  margin: 20px;
  font-size: 20px;

  &:hover {
    background-color: ${({ type }) =>
      type === 'normal' ? 'var(--green-strong)' : 'var(--red-strong)'};
  }
`

export const ListPasswordButton = styled.button`
  border-radius: 5px;
  text-transform: uppercase;

  padding: 0 10px;
  color: var(--white);
  height: 50px;
  width: 130px;
  background-color: ${({ type }) =>
    type === 'normal' ? 'var(--green-high)' : 'var(--red-high)'};
  transition: 0.5s;
  cursor: pointer;
  margin: 20px;
  font-size: 20px;

  &:hover {
    background-color: ${({ type }) =>
      type === 'normal' ? 'var(--green-strong)' : 'var(--red-strong)'};
  }
`
