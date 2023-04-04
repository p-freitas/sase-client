import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './style'

const Home = () => {
  const navigate = useNavigate()

  const handleNavigate = path => {
    navigate(path)
  }

  return (
    <S.Container>
      <S.Button onClick={() => handleNavigate('/password')}>
        Terminal de senhas
      </S.Button>
      <S.Button onClick={() => handleNavigate('/service')}>
        Gerenciamento das senhas
      </S.Button>
      <S.Button onClick={() => handleNavigate('/display')}>
        Terminal da TV
      </S.Button>
      <S.Button onClick={() => handleNavigate('/oldPasswords')}>
        Senhas já chamadas
      </S.Button>
    </S.Container>
  )
}

export default Home
