import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {CgProfile} from 'react-icons/cg'
import style from "../Operacao/styles.module.css";

import { getUsuario, autenticaOToken } from "../../services/usuario-service";

import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";

export function Perfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);


    useEffect(() => {
        findUsuario();

        // Fechar sidebar quando tela ficar menor que 700px
        const handleResize = () => {
            const newWindowWidth = window.innerWidth;
            setWindowWidth(newWindowWidth);

            if (newWindowWidth >= 700) {
              setOpenSidebarToggle(false);
            } else {
              setOpenSidebarToggle(true);
            }
          };

          window.addEventListener('resize', handleResize);

          return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, []);

    async function findUsuario() {
        try {
            const idUsuario = await autenticaOToken();
            const result = await getUsuario(idUsuario.data);
            setUsuario(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function editUsuario(data) {
        try {
            console.log(data);
            navigate(`/editPerfil`)
        } catch (error) {
            console.error(data);
        }
    }

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <main className="main-container">
            <Header OpenSidebar={OpenSidebar} />
            <div className="d-flex w-100 min-vh-100">
                <div>
                    <Sidebar
                        openSidebarToggle={openSidebarToggle}
                        OpenSidebar={OpenSidebar}
                    />
                </div>
                <div className="p-3 w-100">
                    <div className={style.mainCard}>
                        <h1 className="text-dark mb-3">Perfil</h1>
                        <CgProfile className='icon-profile-large m-2 text-dark'/>
                        <div className={style.item}>
                            <p className="fw-bold">Nome</p>
                            <p>{usuario.nome}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Email</p>
                            <p>{usuario.email}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Senha</p>
                            <p>************</p>
                        </div>
                        <hr className="mb-5" />
                        <div className="w-100 d-flex justify-content-end">
                            <button className={style.btnEditar} onClick={editUsuario}>
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
