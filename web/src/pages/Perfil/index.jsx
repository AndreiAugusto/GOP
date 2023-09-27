import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import style from "../Operacao/styles.module.css";

import {
    updateOperacao
} from "../../services/operacao-service";

import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";

export function Perfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        // setEmail();
        // console.log(emailUsu);
        // findOperacao();
    }, []);

    async function findOperacao() {
        try {
            // const result = await getOperacao(id);
            // setOperacoes(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }



    async function editOperacao(data) {
        try {
            await updateOperacao({
                id: data.id,
                nomeOperacao: data.nomeOperacao,
                cidade: data.cidade,
            });
            await findOperacao();
        } catch (error) {
            console.error(data);
        }
    }

    function alerta(message) {
        return alert(message);
    }

    function voltar(){
        navigate('/operacoes');
    }

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <main className="main-container">
            <Header OpenSidebar={OpenSidebar} />
            <div className="d-flex w-100 vh-100">
                <div>
                    <Sidebar
                        openSidebarToggle={openSidebarToggle}
                        OpenSidebar={OpenSidebar}
                    />
                </div>
                <div className="p-3 w-100">
                    <div className={style.mainCard}>
                        <h1 className="text-dark mb-5">Visualizar Operação</h1>
                        <div className={style.item}>
                            <p className="fw-bold">Nome da Operação</p>
                            <p>{usuario.nome}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Custo</p>
                            {/* <p>{usuario.email}</p> */}
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Número de Agentes</p>
                            <p>********</p>
                        </div>
                        <hr className="mb-5" />
                        <div className="d-flex w-100">
                            <div className="d-flex w-100 justify-content-start">
                                <button className={style.btnEditar} onClick={voltar}>
                                    Voltar
                                </button>
                            </div>
                            <div className="w-100 d-flex justify-content-end">
                                <button className={style.btnExcluir}>
                                    Excluir
                                </button>
                                <button className={style.btnEditar}>
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
