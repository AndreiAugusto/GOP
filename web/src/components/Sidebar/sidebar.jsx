import React from 'react';
import '../../app.css';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import {BsGrid1X2Fill} from 'react-icons/bs';
import {BiLogOut} from 'react-icons/bi';
import {GiPoliceBadge} from 'react-icons/gi';
import {MdAccountCircle} from 'react-icons/md';
import {RiPoliceCarFill} from 'react-icons/ri';
import {FaCrosshairs} from 'react-icons/fa';

export function Sidebar({openSidebarToggle, OpenSidebar}) {

    const { logout } = useContext(AuthContext);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <GiPoliceBadge  className='icon_header'/> GOP
            </div>
        </div>

        <ul className='sidebar-list'>
            <a href="/dashboard">
                <li className='sidebar-list-item d-flex align-items-center'>
                        <BsGrid1X2Fill className='icon'/> Dashboard
                </li>
            </a>
            <a href="/operacoes">
                <li className='sidebar-list-item d-flex align-items-center'>
                        <FaCrosshairs className='icon'/> Operações
                </li>
            </a>
            <a href="/veiculos">
                <li className='sidebar-list-item d-flex align-items-center'>
                        <RiPoliceCarFill className='icon'/> Veículos
                </li>
            </a>
            <a href="/perfil">
                <li className='sidebar-list-item d-flex align-items-center'>
                        <MdAccountCircle className='icon'/> Perfil
                </li>
            </a>
            <a onClick={logout}>
                <li className='sidebar-list-item d-flex align-items-center'>
                    <BiLogOut className='icon'/> Sair
                </li>
            </a>
        </ul>
    </aside>
  )
}
