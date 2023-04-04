import styled from 'styled-components'

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

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

export const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #f0f0f0;
  border: 1px solid;
  cursor: pointer;
  margin: 0 0.5rem;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
`

export const NoMorePasswordsText = styled.h1`
  margin: 50px;
  border: 1px solid;
  padding: 10px;
`
