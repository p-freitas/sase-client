import styled from 'styled-components'

export const Wrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const WrapperButtons = styled.div`
`

export const CurrentPasswordContainer = styled.p`
  font-size: 3em;
  display: flex;
    flex-direction: column;
    align-items: center;
`

export const CurrentPassword = styled.p`
  font-size: 40px;
  color: ${({ color }) => (color)};
  border: 1px solid;
  margin: 5px;
  padding: 5px;
`

export const SelectTypeText = styled.p`
  font-size: 3em;
`
