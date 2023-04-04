import React from 'react'
import { elastic as Menu } from 'react-burger-menu'
import './styles.css'

const Pagination = ({ props }) => {
  return (
    <Menu>
      <a className='menu-item' href='/'>
        Home
      </a>
      <a className='menu-item' href='/password'>
        Terminal de senhas
      </a>
      <a className='menu-item' href='/service'>
        Gerenciamento das senhas
      </a>
      <a className='menu-item' href='/display'>
        Terminal da TV
      </a>
      <a className='menu-item' href='/oldPasswords'>
        Senhas já chamadas
      </a>
    </Menu>
  )
}

export default Pagination
