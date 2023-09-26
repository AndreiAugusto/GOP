import {  useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import style from "../Operacoes/styles.module.css";

import {
    getOperacao,
    deleteOperacao,
    updateOperacao
} from "../../services/operacao-service";

import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";

export function PageOperacao() {
    const navigate = useNavigate();
    const [operacoes, setOperacoes] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const {id} = useParams();
    useEffect(() => {
        findOperacoes();
    }, []);

    async function findOperacoes() {
        try {
            const result = await getOperacao(id);
            setOperacoes(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function removeOperacao(id) {
        try {
            await deleteOperacao(id);
            await findOperacoes();
        } catch (error) {
            console.error(error);
        }
    }


    async function editOperacao(data) {
        try {
            await updateOperacao({
                id: data.id,
                nomeOperacao: data.nomeOperacao,
                cidade: data.cidade,
            });
            await findOperacoes();
        } catch (error) {
            console.error(data);
        }
    }

    function alerta(message) {
        return alert(message);
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
                    <div className={style.main}>
                        <p>{operacoes.nome}</p>
                        <p>{operacoes.custo}</p>
                        <p>{operacoes.qtdVeiculo}</p>
                        <p>{operacoes.nAgente}</p>
                        <p>{operacoes.comandante}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
