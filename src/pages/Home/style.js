import styled from 'styled-components'

export const HomeWrapper = styled.div`
`

export const Container = styled.main`
  height: 100vh;
  width: 100%;

  align-items: center;
  display: flex;
  justify-content: center;
  background-color: white;
  color: black;
`

export const Button = styled.button`
  border-radius: 5px;
  text-transform: uppercase;

  padding: 0 10px;
  color: var(--white);
  height: 50px;
  background-color: ${({ type }) => (type === 'normal' ? 'var(--green-high)' : 'var(--red-high)')};
  transition: 0.5s;
  cursor: pointer;
  margin: 20px;
  font-size: 20px;

  &:hover {
    background-color: ${({ type }) => (type === 'normal' ? 'var(--green-strong)' : 'var(--red-strong)')};
  }
`