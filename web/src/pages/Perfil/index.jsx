import React from 'react';
import { Sidebar } from '../../components/Sidebar/sidebar';
import { Header } from '../../components/Header/header';
import { useState } from 'react';

export function Perfil() {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

  return (
    <main className='main-container'>
      <Header OpenSidebar={OpenSidebar}/>
        <div className='d-flex w-100 vh-100'>

          <div>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          </div>
          <div className='p-3 w-75'>
            <h1 className='text-dark'>ESTE É O PERFIL</h1>
          </div>
        </div>
        

    </main>
  )
}
