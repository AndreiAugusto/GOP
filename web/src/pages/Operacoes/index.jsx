import { Button, Form, Modal, Pagination } from "react-bootstrap";
import {  useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthContext';

import style from "./styles.module.css";

import {
    getOperacoes,
    createOperacao,
} from "../../services/operacao-service";
import { getAllVeiculos } from "../../services/veiculo-service";

import { Operacao } from "../../components/Operacao/Operacao";
import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { createOperacaoVeiculo, getOpVeiculos } from "../../services/operacao-veiculo-service";
import GerarPdfOperacoes from "../../components/GerarPdfOperacoes/GerarPdfOperacoes";

export function Operacoes() {
    const { logout } = useContext(AuthContext);
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
    const [opVeiculos, setOpVeiculos] = useState([]);



    const navigate = useNavigate();

    useEffect(() => {
        findOperacoes();
        findVeiculos();
        findOpVeiculos();

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
            logout();
        }
    }

    async function findVeiculos() {
        try {
            const result = await getAllVeiculos(ordemId);
            setVeiculos(result.data);
        } catch (error) {
            logout();
        }
    }

    async function findOpVeiculos(){
        try {
            const result = await getOpVeiculos('decrescente');
            setOpVeiculos(result.data)
        } catch (error) {
            logout();
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
            logout();
        }
    }

    function formataData (data){
        const current = new Date(data);
        const followingDay = new Date(current.getTime()+86400000);
        return followingDay;
    }

    async function addOperacao(data) {
        try {
            const result = await createOperacao({
                nomeOperacao: data.nomeOperacao,
                custo: data.custo,
                nAgentes: data.nAgentes,
                cidade: data.cidade,
                data: formataData(data.data),
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
            });

            setIsCreated(false);
            await findOperacoes();
            toast.success('Operação criada com sucesso');
        } catch (error) {
            toast.error(error)
            console.error(error);
        }
    }

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }


    //itens para paginação
    const itensPorPagina = 5;
    const [paginaAtual, setPaginaAtual] = useState(1);
    let totalPaginas;
    let operacoesExibidas;

    const indiceInicio = (paginaAtual - 1) * itensPorPagina;
    const indiceFim = paginaAtual * itensPorPagina;

    if(operacoes && operacoes.length > 0){
        operacoesExibidas = operacoes?.slice(indiceInicio, indiceFim);
        totalPaginas = Math.ceil(operacoes.length / itensPorPagina);
    }else{
        operacoesExibidas = 0;
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
                                Cadastrar nova operação
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
                                        />
                                    ))
                                ):
                                operacoesExibidas.map((operacao) => (
                                    <Operacao
                                      key={operacao.id}
                                      operacao={operacao}
                                      removeOperacao={async () => {
                                        await visualizarOperacao(operacao.id);
                                      }}
                                    />
                                  ))
                            ) : (
                                <h1 className="text-dark text-center mt-5">Não há Operações!</h1>
                            )}
                            <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            />

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
                            <GerarPdfOperacoes operacoes={operacoes} veiculos={veiculos} opVeiculo={opVeiculos}/>

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
                                    className="m-auto"
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
                                                <option>Barra do Garças</option>
                                                <option>Sinop</option>
                                                <option>Cáceres</option>
                                                <option>Juína</option>
                                                <option>Poconé</option>
                                                <option>Lucas do Rio Verde</option>
                                                <option>Tangará da Serra</option>
                                                <option>Nobres</option>
                                                <option>Diamantino</option>
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
                                                <Form.Group key={veiculo.id} className="mb-4">
                                                    <Form.Label className="text-primary">
                                                        Quantidade de {nomeVeiculo}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        defaultValue='0'
                                                        name={nomeVeiculo}
                                                        {...register(nomeVeiculo, {
                                                            required:true,
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
                                        <Button
                                            variant="secondary"
                                            onClick={() => setIsCreated(false)}
                                        >
                                            Fechar
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Cadastrar
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
