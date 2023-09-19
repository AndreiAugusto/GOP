import React from 'react'
import logo from '../../img/layout_set_logo.png'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

export function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
        </div>
        <div className='header-left'>
        </div>
        <div className='header-right'>
            <img className='menu-icon' src={logo} alt="" />
        </div>
    </header>
  )
}
