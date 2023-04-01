import styled from 'styled-components'

export const Wrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const CurrentPassword = styled.p`
  font-size: 9em;
  color: ${({ color }) => (color)};
  border: 1px solid;
  margin: 20px;
  padding: 10px;
`

export const Title = styled.h1`
  font-size: 2em;
`

export const CurrentPasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;
  justify-content: center;
`
