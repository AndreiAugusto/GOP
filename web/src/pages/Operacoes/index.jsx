import { Button, Form, Modal } from "react-bootstrap";
import {  useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
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
                                <p>#</p>
                                <p>Operação</p>
                                <p>Custo</p>
                                <p>Local</p>
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
                                        <Form.Group>
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
                                        <Form.Group className="mt-4">
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
                                                <option>VG</option>
                                                <option>Sorriso</option>
                                                <option>Rondonópolis</option>
                                            </Form.Select>
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
