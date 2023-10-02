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
import { getSomaVeiculos } from "../../services/operacao-veiculo-service";

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
    const [somaVeiculos, setSomaVeiculos] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        findVeiculos();
        findSomaVeiculos()
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
        } catch (error) {
            console.error(error);
        }
    }

    async function findSomaVeiculos(){
        try {
            const result = await getSomaVeiculos();
            setSomaVeiculos(result.data);
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
                                        Tipo do veículo
                                    </div>
                                    <div className="col">
                                        Quantidade
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
                                ): somaVeiculos && veiculos.map((veiculo) => {
                                    const soma = somaVeiculos.find((item) => item.veiculoId === veiculo.id);

                                    return (
                                        <div key={veiculo.id}>
                                            <div className="container" >
                                                <div className="row align-items-center text-dark responsivo">
                                                    <div className="col">
                                                        {veiculo.id}
                                                    </div>
                                                    <div className="col">
                                                        {veiculo.tipoVeiculo}
                                                    </div>
                                                    <div className="col">
                                                        {soma ? soma.soma_quantidade : 0}
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />
                                        </div>
                                    )})
                            ) : (
                                <h1 className="text-dark text-center mt-5">Não há veículos cadastrados!</h1>
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
                                        {/* <Form.Group className="mb-4">
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
                                                            "Id operação é necessário",
                                                    },
                                                })}
                                            />
                                            {errors.idOperacao && (
                                                <span className="position-absolute text-danger">
                                                    {errors.idOperacao.message}
                                                </span>
                                            )}
                                        </Form.Group> */}
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
