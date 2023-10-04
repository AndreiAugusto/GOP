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

    const [ordemId, setOrdemId] = useState('decrescente');
    const [veiculos, setVeiculos] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);
    const [somaVeiculos, setSomaVeiculos] = useState();
    const [isUpdated, setIsUpdated] = useState(true);
    const [newName, setNewName] = useState('');

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

    const handleOrdem = () =>{
        if( ordemId === 'crescente'){
            setOrdemId('decrescente');
            findVeiculos();
        } else {
            setOrdemId('crescente');
            findVeiculos();
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

    async function editVeiculo(data) {
        try {
            console.log(newName)
            // await updateVeiculo({
            //     id: data.id,
            //     tipoVeiculo: data.tipoVeiculo
            // });
            // await findVeiculos();
        } catch (error) {
            console.error(data);
        }
    }



    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <main className="main-container">
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header className="justify-content-center text-primary">
                    <Modal.Title>Editar Nome do Veículo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="ms-5 me-5">
                    <Form.Label className="text-primary">
                        Novo nome do veículo
                    </Form.Label>
                    <Form.Control
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={editVeiculo}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                    <div className="col"></div>
                                </div>
                            </div>
                            <hr />
                            {veiculos.length > 0 ? (

                                somaVeiculos && veiculos.map((veiculo) => {
                                const soma = somaVeiculos.find((item) => item.veiculoId === veiculo.id);

                                return (
                                    <div key={veiculo.id}>
                                        <div className="container" >
                                            <div className="row align-items-center text-dark responsivo p-2">
                                                <div className="col responsivo2">
                                                    {veiculo.id}
                                                </div>
                                                <div className="col responsivo2">
                                                    {veiculo.tipoVeiculo}
                                                </div>
                                                <div className="col responsivo2">
                                                    {soma ? soma.soma_quantidade : 0}
                                                </div>
                                                <div className="col responsivo2">
                                                    <button
                                                    className={style.btnVisualizar} onClick={() => setIsUpdated(true)}>
                                                        Editar
                                                    </button>
                                                    <button
                                                    className={style.btnDeletar}>
                                                        Deletar
                                                    </button>
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
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            variant="secondary"
                                            onClick={() => setIsCreated(false)}
                                        >
                                            Fechar
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Criar
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
