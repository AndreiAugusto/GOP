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
import { getAllVeiculos } from "../../services/veiculo-service";

import { Operacao } from "../../components/Operacao/Operacao";
import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { createOperacaoVeiculo } from "../../services/operacao-veiculo-service";

export function Operacoes() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [busca, setBusca] = useState();
    const [ordemId, setOrdemId] = useState('decrescente');
    const [operacoes, setOperacoes] = useState();
    const [isCreated, setIsCreated] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);
    const [veiculos, setVeiculos] = useState([]);
    const [operacaoVeiculo, setOperacaoVeiculo] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        findOperacoes();
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


    async function findOperacoes() {
        try {
            const result = await getOperacoes(ordemId);
            setOperacoes(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function findVeiculos() {
        try {
            const result = await getAllVeiculos(ordemId);
            setVeiculos(result.data);
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
            const result = await createOperacao({
                nomeOperacao: data.nomeOperacao,
                custo: data.custo,
                nAgentes: data.nAgentes,
                cidade: data.cidade,
                data: data.data,
                duracao: data.duracao,
                comandante: data.comandante,
            });

            veiculos.map((v) => {
                const veiculoInfo = {
                    quantidade: data[v.tipoVeiculo],
                    operacaoId: result.data.id,
                    veiculoId: v.id,
                  };
                createOperacaoVeiculo(veiculoInfo);
                setOperacaoVeiculo((prevOperacaoVeiculos) => [
                    ...prevOperacaoVeiculos,
                    veiculoInfo,
                  ]);
            });

            setIsCreated(false);
            await findOperacoes();
            alert('Operação criada com sucesso')
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
                                        <a onClick={handleOrdem}>ID</a>
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
                            {operacoes && operacoes.length > 0 ? (
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
                                <h1 className="text-dark text-center mt-5">Não há Operações!</h1>
                            )}
                            <Modal
                                show={isCreated}
                                onHide={() => setIsCreated(false)}
                            >
                                <Modal.Header className="justify-content-center text-primary">
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
                                                type="number"
                                                placeholder="Custo da Operação"
                                                name="custo"
                                                {...register("custo", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Custo é necessário",
                                                    },
                                                    pattern:{
                                                        value: /^[+]?\d+$/,
                                                        message: 'Custo não pode ser negativo!'
                                                    }
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
                                                type="number"
                                                placeholder="Número de agentes"
                                                name="nAgentes"
                                                {...register("nAgentes", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Número de agentes é necessário",
                                                    },
                                                    pattern:{
                                                        value: /^[+]?\d+$/,
                                                        message: 'Agentes não pode ser negativo!'
                                                    }
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
                                                type="number"
                                                placeholder="Duração em dias"
                                                name="duracao"
                                                {...register("duracao", {
                                                    pattern:{
                                                        value: /^[+]?\d+$/,
                                                        message: 'Duração não pode ser negativa!'
                                                    },
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
                                        {veiculos ? (
                                            veiculos.map((veiculo) => {
                                                let nomeVeiculo = veiculo.tipoVeiculo
                                                return(
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="text-primary">
                                                        Quantidade de {nomeVeiculo}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        defaultValue='0'
                                                        name={nomeVeiculo}
                                                        {...register(nomeVeiculo, {
                                                            required:false,
                                                            pattern:{
                                                                value: /^[+]?\d+$/,
                                                                message: 'Quantidade não pode ser negativa!'
                                                            }
                                                        })}/>
                                                    {errors[nomeVeiculo] && (
                                                        <span className="position-absolute text-danger">
                                                            {errors[nomeVeiculo].message}
                                                        </span>
                                                    )}
                                                </Form.Group>
                                                )
                                            })
                                        ): <div></div>}
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
