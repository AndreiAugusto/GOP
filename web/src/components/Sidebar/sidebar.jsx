import React from 'react';
import '../../app.css'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsFillGearFill} from 'react-icons/bs';
import {BiLogOut} from 'react-icons/bi';
import {GiPoliceBadge} from 'react-icons/gi';
import {MdAccountCircle} from 'react-icons/md'


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
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <MdAccountCircle className='icon'/> Perfil
                </a>
            </li>
            {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li> */}
            <a onClick={logout}>
                <li className='sidebar-list-item'>
                    <BiLogOut className='icon'/> Sair
                </li>
            </a>
        </ul>
    </aside>
  )
}
