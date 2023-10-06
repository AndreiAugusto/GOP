import React from 'react'
import logo from '../../img/layout_set_logo.png'
import img from '../../img/Group_221.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'

export function Header({OpenSidebar}) {
  return (
    <header className='header'>
      <div className='header-left w-100'>

        <div className='menu-icon'>
            <a className='curs' onClick={OpenSidebar}>
                <GiHamburgerMenu color='black' className='icon-hamburger m-3'/>
            </a>
            <a href='/dashboard'>
                <img src={img} className='menu-icon' alt="" />
            </a>
        </div>

      </div>

      <div className='header-right w-100 color1'>
          <img className='menu-icon' src={logo} alt="" />
          <a href="/perfil">
            <CgProfile className='icon-profile m-2'/>
          </a>
      </div>
    </header>
  )
}
