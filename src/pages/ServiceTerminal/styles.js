import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
`

export const CurrentPassword = styled.p`
  font-size: 40px;
  color: var(--red-high);
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
  width: 80%;
`

export const ServiceTerminalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`

export const OnDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  padding: 20px;
`
