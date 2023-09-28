import { Button, Modal } from "react-bootstrap";
import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import style from "./styles.module.css";

import {
    getOperacao,
    deleteOperacao,
    updateOperacao
} from "../../services/operacao-service";

import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";

export function PageOperacao() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [operacoes, setOperacoes] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const {id} = useParams();
    useEffect(() => {
        findOperacao();
    }, []);

    async function findOperacao() {
        try {
            const result = await getOperacao(id);
            setOperacoes(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    const handleExcluir = () => {
        setModalIsOpen(true);
      };

    const handleEditar = () =>{
        navigate(`/editOperacao/${id}`)
    }

    async function removeOperacao() {
        try {
            await deleteOperacao(id);
            navigate('/operacoes')
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

    function formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
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
                            <p>{operacoes.nome}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Custo</p>
                            <p>R$ {operacoes.custo}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Número de Agentes</p>
                            <p>{operacoes.nAgentes}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Quantidade de Veículos</p>
                            <p>{operacoes.qtdVeiculos}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Cidade</p>
                            <p>{operacoes.cidade}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Data</p>
                            <p>{formatarData(operacoes.data)}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Duração da operação</p>
                            <p>{operacoes.duracao} dias</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Comandante da operação</p>
                            <p>{operacoes.comandante}</p>
                        </div>
                        <hr className="mb-5" />
                        <div className="d-flex w-100 btnResponsivo">
                            <div className="d-flex w-100 justify-content-start btnResponsivo">
                                <button className={style.btnEditar} onClick={voltar}>
                                    Voltar
                                </button>
                            </div>
                            <div className="w-100 d-flex justify-content-end btnResponsivo">
                                <button className={style.btnExcluir} onClick={handleExcluir}>
                                    Excluir
                                </button>
                                <button className={style.btnEditar} onClick={handleEditar}>
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={modalIsOpen}
                onHide={() => setModalIsOpen(false)}
            >
                <Modal.Header>
                    <Modal.Title>
                        Confirmar exclusão?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant='primary'
                        onClick={removeOperacao}>Sim, excluir</Button>
                    <Button
                        variant="secondary"
                        onClick={() => setModalIsOpen(false)}>Não excluir</Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}
