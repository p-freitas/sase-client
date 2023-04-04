import styled from 'styled-components'

export const ContainerDisplay = styled.div`
  height: 100vh;
  width: 100%;

  align-items: center;
  display: flex;
  justify-content: center;
  background-color: white;
  color: black;
  flex-direction: column;
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: inherit;
  height: inherit;
`

export const CurrentPassword = styled.p`
  font-size: 9em;
  color: ${({ color }) => (color ? color : 'black')};
  border: 1px solid;
  margin: 20px;
  padding: 10px;
  height: fit-content;
`

export const LastPassword = styled.p`
  font-size: 5em;
  color: ${({ color }) => (color ? color : 'black')};
  border: 1px solid;
  margin: 20px;
  padding: 10px;
  height: fit-content;
`

export const Title = styled.h1`
  font-size: 40px;
  color: black;
`

export const SubTitle = styled.h1`
  font-size: 30px;
  color: black;
`

export const TitleSelect = styled.h1`
  font-size: 40px;
  color: red;
`

export const TitleLastPassword = styled.h1`
  font-size: 40px;
  color: black;
`

export const SelectLastPassword = styled.h1`
  font-size: 2em;
  color: black;
  width: 85%;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`

export const CurrentPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  background-color: white;
  width: 85%;
  height: 70%;
  margin: 10px;
  box-shadow: 0px 0 13px 5px rgb(0 0 0 / 12%);
  justify-content: space-evenly;
`

export const LastPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  width: auto;
  justify-content: center;
  background-color: white;
  width: 30%;
  height: 70%;
  margin: 10px;
  box-shadow: 0px 0 13px 5px rgb(0 0 0 / 12%);
`

export const CurrentHour = styled.p`
  position: fixed;
  bottom: 60px;
  font-size: 35px;
`
