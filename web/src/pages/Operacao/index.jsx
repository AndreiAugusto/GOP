import { Button, Form, Modal } from "react-bootstrap";
import {  useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import style from "../Operacoes/styles.module.css";

import {
    getOperacoes,
    deleteOperacao,
    createOperacao,
    updateOperacao
} from "../../services/operacao-service";

import { Operacao } from "../../components/Operacao/Operacao";
import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";

export function PageOperacao() {
    const [operacoes, setOperacoes] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        findOperacoes();
    }, []);

    async function findOperacoes() {
        try {
            const result = await getOperacoes();
            setOperacoes(result.data);
        } catch (error) {
            console.error(error);
            Navigate("/");
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

    async function addOperacao(data) {
        try {
            await createOperacao(data);
            setIsCreated(false);
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
                        <div className={style.card}>
                            <button
                                className={style.btnCriar}
                                onClick={() => setIsCreated(true)}
                            >
                                Criar nova operação
                            </button>
                            <div className="d-flex justify-content-between fw-bold fs-5 ps-4 pe-4">
                                <p className={style.pResponsive}>#</p>
                                <p className={style.pResponsive}>Operação</p>
                                <p className={style.pResponsive}>Custo</p>
                                <p className={style.pResponsive}>Local</p>
                                <p className="text-light">asdssasdasd</p>

                            </div>
                            <hr />
                            {operacoes && operacoes.length > 0 ? (
                                operacoes.map((operacao) => (
                                    <Operacao
                                        operacao={operacao}
                                        removeOperacao={async () => {
                                            await removeOperacao(operacao.id);
                                            alerta(`${operacao.nome} deletado!`);
                                        }}
                                        editOperacao={editOperacao}
                                    />
                                ))
                            ) : (
                                <h1>Não há Operações!</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
