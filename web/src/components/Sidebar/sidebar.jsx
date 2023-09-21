import React from 'react';
import '../../app.css'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import {BsGrid1X2Fill} from 'react-icons/bs';
import {BiLogOut} from 'react-icons/bi';
import {GiPoliceBadge} from 'react-icons/gi';
import {MdAccountCircle} from 'react-icons/md'
import {RiPoliceCarFill} from 'react-icons/ri'


export function Sidebar({openSidebarToggle, OpenSidebar}) {

    const { logout } = useContext(AuthContext);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": "color1"}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <GiPoliceBadge  className='icon_header'/> GOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <a href="/dashboard">
                <li className='sidebar-list-item'>
                        <BsGrid1X2Fill className='icon'/> Dashboard
                </li>
            </a>
            <a href="/operacoes">
                <li className='sidebar-list-item'>
                        <RiPoliceCarFill className='icon'/> Operações
                </li>
            </a>
            <a href="/perfil">
                <li className='sidebar-list-item'>
                        <MdAccountCircle className='icon'/> Perfil
                </li>
            </a>
            <a onClick={logout}>
                <li className='sidebar-list-item'>
                    <BiLogOut className='icon'/> Sair
                </li>
            </a>
        </ul>
    </aside>
  )
}
