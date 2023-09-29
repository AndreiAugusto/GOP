import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import style from "../Operacoes/styles.module.css";

import {
    createVeiculo,
    getAllVeiculos,
    getVeiculo,
    updateVeiculo
} from "../../services/veiculo-service";
import{ getOperacoes } from '../../services/operacao-service'

import { Operacao } from "../../components/Operacao/Operacao";
import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";

export function Veiculos() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [busca, setBusca] = useState();
    const [ordemId, setOrdemId] = useState('decrescente');
    const [veiculos, setVeiculos] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);
    const [operacao, setOperacao] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        findVeiculos();
        getAllOperacoes();

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


    async function findVeiculos() {
        try {
            const result = await getAllVeiculos(ordemId);
            setVeiculos(result.data);
            // console.log(veiculos)
        } catch (error) {
            console.error(error);
        }
    }

    async function getAllOperacoes(){
        try {
            const result = await getOperacoes();
            setOperacao(result);
            console.log(operacao)
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
            findVeiculos();
        } else {
            setOrdemId('crescente');
            findVeiculos();
        }
    }

    async function visualizarOperacao(id) {
        try {
            navigate(`/operacao/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    async function addVeiculo(data) {
        try {
            console.log(data)
            await createVeiculo(data);
            setIsCreated(false);
            await findVeiculos();
            alert('Veículo criado com sucesso')
        } catch (error) {
            console.error(error);
        }
    }

    async function editOperacao(data) {
        try {
            await updateVeiculo({
                id: data.id,
                tipo: data.tipo,
                quantidade: data.quantidade,
            });
            await findVeiculos();
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
                                Criar novo veículo
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
                                    Veículo
                                    </div>
                                    <div className="col">
                                    Quantidade
                                    </div>
                                    <div className="col">
                                        Id da operação
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
                            {veiculos.length > 0 ? (
                                busca ? (
                                    veiculos
                                    .filter((operacao) => operacao.tipo.toLowerCase().includes(busca))
                                    .map((operacao) => (
                                        <Operacao
                                            key={operacao.id}
                                            operacao={operacao}
                                            removeOperacao={async () => {
                                                await visualizarOperacao(operacao.id);
                                            }}
                                            editVeiculo={editOperacao}
                                        />
                                    ))
                                ): veiculos.map((operacao) => (

                                    <div className="container" key={operacao.id}>
                                        <div className="row">
                                            <div className="col">
                                                {operacao.id}
                                            </div>
                                            <div className="col">
                                                {}
                                            </div>
                                            <div className="col">
                                                {operacao.tipo}
                                            </div>
                                            <div className="col">
                                                {operacao.quantidade}
                                            </div>
                                            <div className="col">
                                                {operacao.operacaoId}
                                            </div>
                                        </div>
                                        <hr />
                                    </div>

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
                                        Cadastrar novo tipo de veículo
                                    </Modal.Title>
                                </Modal.Header>
                                <Form
                                    className="ms-5"
                                    noValidate
                                    onSubmit={handleSubmit(addVeiculo)}
                                >
                                    <Modal.Body>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Tipo do veículo
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Tipo do veículo"
                                                name="tipo"
                                                {...register("tipo", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Tipo é necessário",
                                                    },
                                                })}
                                            />
                                            {errors.tipo && (
                                                <span className="position-absolute text-danger">
                                                    {errors.tipo.message}
                                                </span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Quantidade de veículos
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Quantia de veículos"
                                                name="quantidade"
                                                {...register("quantidade", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Tipo é necessário",
                                                    },
                                                })}
                                            />
                                            {errors.quantidade && (
                                                <span className="position-absolute text-danger">
                                                    {errors.quantidade.message}
                                                </span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-primary">
                                                Id da operação
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Id da operação"
                                                name="idOperacao"
                                                {...register("idOperacao", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Tipo é necessário",
                                                    },
                                                })}
                                            />
                                            {errors.idOperacao && (
                                                <span className="position-absolute text-danger">
                                                    {errors.idOperacao.message}
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
