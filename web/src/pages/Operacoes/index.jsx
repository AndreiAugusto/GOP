import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import style from "./styles.module.css";

import {
    getOperacoes,
    deleteOperacao,
    createOperacao,
    updateOperacao
} from "../../services/operacao-service";

import { Operacao } from "../../components/Operacao/Operacao";
import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";

export function Operacoes() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [busca, setBusca] = useState();
    const [ordemId, setOrdemId] = useState('decrescente');
    const [operacoes, setOperacoes] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);

    const navigate = useNavigate();

    useEffect(() => {
        findOperacoes();

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


    async function findOperacoes() {
        try {
            const result = await getOperacoes(ordemId);
            setOperacoes(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleBusca = (data) =>{
        setBusca(data.target.value.toLowerCase());
    }

    const handleOrdem = () =>{
        if( ordemId === 'crescente'){
            setOrdemId('decrescente');
            findOperacoes();
        } else {
            setOrdemId('crescente');
            findOperacoes();
        }
    }

    async function visualizarOperacao(id) {
        try {
            navigate(`/operacao/${id}`);
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
                    <div className={style.main}>
                        <div className={style.card}>
                            <button
                                className={style.btnCriar}
                                onClick={() => setIsCreated(true)}
                            >
                                Criar nova operação
                            </button>
                            <div className="container">
                                <div className="row mb-3 fw-bold text-dark responsivo-sumiu">
                                    <div className="col">
                                        <a onClick={handleOrdem}>#</a>
                                    </div>
                                    <div className="col">
                                    Operação
                                    </div>
                                    <div className="col">
                                    Custo
                                    </div>
                                    <div className="col">
                                    Local
                                    </div>
                                    <div className="col">

                                    </div>
                                </div>
                            </div>
                            <div className="row ps-3 pe-3">
                                <input className="form-control"
                                    type="text" name="busca"
                                    onChange={handleBusca}
                                    placeholder="Pesquisar por nome de operação"
                                />
                            </div>
                            <hr />
                            {operacoes.length > 0 ? (
                                busca ? (
                                    operacoes
                                    .filter((operacao) => operacao.nome.toLowerCase().includes(busca))
                                    .map((operacao) => (
                                        <Operacao
                                            key={operacao.id}
                                            operacao={operacao}
                                            removeOperacao={async () => {
                                                await visualizarOperacao(operacao.id);
                                            }}
                                            editOperacao={editOperacao}
                                        />
                                    ))
                                ): operacoes.map((operacao) => (
                                    <Operacao
                                        key={operacao.id}
                                        operacao={operacao}
                                        removeOperacao={async () => {
                                            await visualizarOperacao(operacao.id);
                                        }}
                                        editOperacao={editOperacao}
                                    />
                                ))
                            ) : (
                                <h1>Não há Operações!</h1>
                            )}
                            <Modal
                                show={isCreated}
                                onHide={() => setIsCreated(false)}
                            >
                                <Modal.Header className="justify-content-center">
                                    <Modal.Title>
                                        Cadastrar nova Operação
                                    </Modal.Title>
                                </Modal.Header>
                                <Form
                                    className="ms-5"
                                    noValidate
                                    onSubmit={handleSubmit(addOperacao)}
                                >
                                    <Modal.Body>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Nome da Operação
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nome da Operação"
                                                name="nomeOperacao"
                                                {...register("nomeOperacao", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Nome é necessário",
                                                    },
                                                })}
                                            />
                                            {errors.nomeOperacao && (
                                                <span className="position-absolute text-danger">
                                                    {errors.nomeOperacao.message}
                                                </span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Custo
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Custo da Operação"
                                                name="custo"
                                                {...register("custo", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Custo é necessário",
                                                    },
                                                })}
                                            />
                                            {errors.custo && (
                                                <span className="position-absolute text-danger">
                                                    {errors.custo.message}
                                                </span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                N° de Agentes
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Número de agentes"
                                                name="nAgentes"
                                                {...register("nAgentes", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Número de agentes é necessário",
                                                    },
                                                })}
                                            />
                                            {errors.nAgentes && (
                                                <span className="position-absolute text-danger">
                                                    {errors.nAgentes.message}
                                                </span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Quantidade de veículos
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Número de veículos"
                                                name="qtdVeiculos"
                                                {...register("qtdVeiculos", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Obrigatório",
                                                    },
                                                })}
                                            />
                                            {errors.qtdVeiculos && (
                                                <span className="position-absolute text-danger">
                                                    {errors.qtdVeiculos.message}
                                                </span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Selecione a cidade
                                            </Form.Label>
                                            <Form.Select
                                                {...register("cidade", {
                                                    required:
                                                        "Escolha necessária",
                                                })}
                                            >
                                                <option disabled>
                                                    Clique para selecionar
                                                </option>
                                                <option>Cuiabá</option>
                                                <option>Várzea Grande</option>
                                                <option>Sorriso</option>
                                                <option>Rondonópolis</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Data
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="data"
                                                {...register("data", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Data é obrigatorio",
                                                    },
                                                })}
                                            />
                                            {errors.data && (
                                                <span className="position-absolute text-danger">
                                                    {errors.data.message}
                                                </span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Duração da operação
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Duração em dias"
                                                name="duracao"
                                                {...register("duracao", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Duração é obrigatório",
                                                    },
                                                })}
                                            />
                                            {errors.duracao && (
                                                <span className="position-absolute text-danger">
                                                    {errors.duracao.message}
                                                </span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Comandante
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Comandante da operação"
                                                name="comandante"
                                                {...register("comandante", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Comandante é obrigatório",
                                                    },
                                                })}
                                            />
                                            {errors.comandante && (
                                                <span className="position-absolute text-danger">
                                                    {errors.comandante.message}
                                                </span>
                                            )}
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" type="submit">
                                            Criar
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={() => setIsCreated(false)}
                                        >
                                            Fechar
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
