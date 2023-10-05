import { Button, Form, Modal, Pagination } from "react-bootstrap";
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import style from "../Operacoes/styles.module.css";
import { Veiculo } from '../../components/Veiculo/Veiculo'

import {
    createVeiculo,
    getAllVeiculos,
    deleteVeiculo,
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
            await updateVeiculo({
                id: data.id,
                tipoVeiculo: data.tipoVeiculo
            });
            await findVeiculos();
            alert('Editado com sucesso!')
        } catch (error) {
            console.error(data);
        }
    }

    async function removeVeiculo(data){
        try{
            await deleteVeiculo(data);
            await findVeiculos();
        } catch (error) {
            console.error(data);
        }
    }


    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

        //itens para paginação
        const itensPorPagina = 5;
        const [paginaAtual, setPaginaAtual] = useState(1);
        let totalPaginas;
        let veiculosExibidos;

        const indiceInicio = (paginaAtual - 1) * itensPorPagina;
        const indiceFim = paginaAtual * itensPorPagina;

        if(veiculos && veiculos.length > 0){
            veiculosExibidos = veiculos?.slice(indiceInicio, indiceFim);
            totalPaginas = Math.ceil(veiculos.length / itensPorPagina);
        }else{
            veiculosExibidos = 0;
            totalPaginas = 0;
        }
        const handlePaginaClick = (novaPagina) => {
          setPaginaAtual(novaPagina);
        };
        const renderNumerosDePagina = () => {
          const numerosDePagina = [];
          for (let pagina = 1; pagina <= totalPaginas; pagina++) {
            numerosDePagina.push(
              <Pagination.Item
                key={pagina}
                active={pagina === paginaAtual}
                onClick={() => handlePaginaClick(pagina)}
              >
                {pagina}
              </Pagination.Item>
            );
          }
          return numerosDePagina;
        };
        //fim de itens para paginação

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
                                    <div className="col"></div>
                                </div>
                            </div>
                            <hr />
                            {veiculos.length > 0 ? (

                                somaVeiculos && veiculosExibidos.map((veiculo) => {
                                const soma = somaVeiculos.find((item) => item.veiculoId === veiculo.id);
                                const soma_quantidade = soma ? soma.soma_quantidade : 0;
                                return (
                                    <div key={veiculo.id}>
                                        <Veiculo
                                            key={veiculo.id}
                                            veiculo={veiculo}
                                            editVeiculo={editVeiculo}
                                            apagarVeiculo={() =>{
                                                if(soma_quantidade == 0){
                                                    removeVeiculo(veiculo.id);
                                                    alert('Veículo deletado com sucesso!');
                                                }else{
                                                    alert('Não é possivel deletar pois possuem veículos cadastrados em operaçoes')
                                                }
                                            }}
                                            quantidade={soma_quantidade}

                                        />
                                        <hr />
                                    </div>
                                )})
                            ) : (
                                <h1 className="text-dark text-center mt-5">Não há veículos cadastrados!</h1>
                            )}
                            <Pagination className="justify-content-center mt-5">
                                <Pagination.Prev
                                onClick={() => handlePaginaClick(paginaAtual - 1)}
                                disabled={paginaAtual === 1}
                                />
                                {renderNumerosDePagina()}
                                <Pagination.Next
                                onClick={() => handlePaginaClick(paginaAtual + 1)}
                                disabled={paginaAtual === totalPaginas}
                                />
                            </Pagination>
                            <Modal
                                show={isCreated}
                                onHide={() => setIsCreated(false)}
                            >
                                <Modal.Header className="justify-content-center text-primary">
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
