import { Button, Modal } from "react-bootstrap";
import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import style from "./styles.module.css";

import {
    getOperacao,
    deleteOperacao,
} from "../../services/operacao-service";
import { getOperacaoVeiculo } from "../../services/operacao-veiculo-service";

import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";
import GerarPdfOperacao from "../../components/GerarPdfOperacao/GerarPdfOperacao";

export function PageOperacao() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [operacoes, setOperacoes] = useState();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);
    const [veiculos, setVeiculos] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const {id} = useParams();

    useEffect(() => {
        findOperacao();
        findVeiculos();
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

    async function findOperacao() {
        try {
            const result = await getOperacao(id);
            setOperacoes(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function findVeiculos() {
        try {
            const result = await getOperacaoVeiculo(id)
            setVeiculos(result.data);
        } catch (error) {
            console.error(error);
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

    function voltar(){
        navigate('/operacoes');
    }

    function formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
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
                {operacoes?
                    <div className={style.mainCard}>
                        <h1 className="text-dark mb-5">Visualizar Operação</h1>

                        <div className={style.item}>
                            <p className="fw-bold">Nome da Operação</p>
                            <p>{operacoes.nome}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Custo</p>
                            <p>{operacoes.custo.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}</p>
                        </div>
                        <hr />
                        <div className={style.item}>
                            <p className="fw-bold">Número de Agentes</p>
                            <p>{operacoes.nAgentes}</p>
                        </div>
                        <hr />
                        {veiculos ? (
                            veiculos.map((veiculo) => {
                                let nomeVeiculo = veiculo.Veiculo.tipoVeiculo;
                                const quantidade = veiculo.quantidade;
                                return (
                                    <div className="w-100" key={veiculo.veiculoId}>

                                    <div className={style.item}>
                                        <p className="fw-bold">Quantidade de {nomeVeiculo}s</p>
                                        <p>{quantidade ? quantidade : 0}</p>
                                    </div>
                                    <hr />
                                    </div>
                                )
                            })
                        ) : <div></div>
                        }
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
                                <GerarPdfOperacao operacao={operacoes} veiculos={veiculos} />
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

                : <p>Erro</p>}
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
                        variant="secondary"
                        onClick={() => setModalIsOpen(false)}>Não excluir
                    </Button>
                    <Button
                        variant='danger'
                        onClick={removeOperacao}>Sim, excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}
