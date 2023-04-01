import styled from 'styled-components'

export const RedButton = styled.button`
  border-radius: 5px;
  text-transform: uppercase;

  padding: 0 10px;
  color: var(--white);
  height: 100px;
  width: 200px;
  background-color: ${({ color }) => (color)};
  transition: 0.5s;
  cursor: pointer;
  margin: 10px;
  font-size: 25px;
`
