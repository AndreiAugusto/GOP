import {  Form } from "react-bootstrap";
import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import style from "../Operacao/styles.module.css";

import {
    getOperacao,
    updateOperacao
} from "../../services/operacao-service";
import { getOperacaoVeiculo, updateOperacaoVeiculo } from "../../services/operacao-veiculo-service";

import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";

export function EditOperacao() {
    const navigate = useNavigate();
    const [operacoes, setOperacoes] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);
    const [veiculos, setVeiculos] = useState([]);
    const [dataFormatada, setDataFormatada] = useState();
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

    useEffect(() => {
        if (operacoes.data) {
            const dataFormatada = new Date(formataDataMenosUm(operacoes.data)).toISOString().split('T')[0];
            setDataFormatada(dataFormatada);
        }
    }, [operacoes.data]);

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

    function formataData (data){
        const current = new Date(data);
        const followingDay = new Date(current.getTime()+86400000);
        return followingDay;
    }
    function formataDataMenosUm (data){
        const current = new Date(data);
        const previousDay = new Date(current.getTime()-86400000);
        return previousDay;
    }
    

    async function editOperacao(data) {
        try {
            veiculos.map((veiculo) => {
                const operacaoVeiculoInfo = {
                    quantidade: data[veiculo.Veiculo.tipoVeiculo],
                    id: veiculo.id
                }
                updateOperacaoVeiculo(veiculo.id, {
                    quantidade: data[veiculo.Veiculo.tipoVeiculo]
                });
            })
            await updateOperacao(id, {
                nome: data.nome,
                custo: data.custo,
                nAgentes: data.nAgentes,
                cidade: data.cidade,
                data: formataData(data.data),
                duracao: data.duracao,
                comandante: data.comandante
            });


            navigate(`/operacao/${id}`);
        } catch (error) {
            console.error(data);
        }
    }

    function voltar(){
        navigate(`/operacao/${id}`);
    }

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <main className="main-container">
            <Header OpenSidebar={OpenSidebar} />
            <div className="d-flex w-100">
                <div>
                    <Sidebar
                        openSidebarToggle={openSidebarToggle}
                        OpenSidebar={OpenSidebar}
                    />
                </div>
                <div className="p-3 w-100">
                    <div className={style.mainCard}>
                        <h1 className="text-dark mb-5">Editar Operação</h1>
                        <Form
                            noValidate
                            onSubmit={handleSubmit(editOperacao)}
                        >
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    Nome da Operação
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={operacoes.nome}
                                    name="nome"
                                    {...register("nome", {
                                        value: operacoes.nome,
                                        required: {
                                            value: true,
                                            message:
                                                "Nome é necessário",
                                        },
                                    })}

                                />
                                {errors.nome && (
                                    <span className="text-danger">
                                        {errors.nome.message}
                                    </span>
                                )}
                            </Form.Group>
                            <hr />
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    Custo
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={operacoes.custo}
                                    name="custo"
                                    {...register("custo", {
                                        value: operacoes.custo,
                                        required: {
                                            value: true,
                                            message:
                                                "O custo é necessário",
                                        },
                                    })}
                                />
                                {errors.custo && (
                                    <span className="text-danger">
                                        {errors.custo.message}
                                    </span>
                                )}
                            </Form.Group>
                            <hr />
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    Numero de Agentes
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={operacoes.nAgentes}
                                    name="nAgentes"
                                    {...register("nAgentes", {
                                        value: operacoes.nAgentes,
                                        required: {
                                            value: true,
                                            message:
                                                "O número de agentes é necessário",
                                        },
                                    })}
                                />
                                {errors.nAgentes && (
                                    <span className="text-danger">
                                        {errors.nAgentes.message}
                                    </span>
                                )}
                            </Form.Group>
                            <hr />
                            {veiculos ? (
                                veiculos.map((veiculo) =>{
                                    let nomeVeiculo = veiculo.Veiculo.tipoVeiculo;
                                    return(
                                        <Form.Group key={veiculo.veiculoId} className="mb-4">
                                            <Form.Label className="text-dark fw-bold">
                                                Quantidade de {nomeVeiculo}
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                defaultValue={veiculo.quantidade}
                                                name={nomeVeiculo}
                                                {...register(nomeVeiculo, {
                                                    value: veiculo.quantidade,
                                                    required: {
                                                        value: true,
                                                        message:
                                                        "A quantidade de veículos é necessário",
                                                    },
                                                    pattern:{
                                                        value: /^[+]?\d+$/,
                                                        message: 'Quantidade não pode ser negativa!'
                                                    }
                                                })}
                                            />
                                            {errors[nomeVeiculo] && (
                                                <span className="text-danger">
                                                    {errors[nomeVeiculo].message}
                                                </span>
                                            )}
                                        </Form.Group>

                                    );
                                })
                            ): <div></div>
                            }
                            <hr />
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    Selecione a cidade
                                </Form.Label>
                                <Form.Select
                                    {...register("cidade", {
                                        value: operacoes.cidade,
                                        required:
                                            "Escolha necessária",
                                    })}
                                    value={operacoes.cidade}
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
                            <hr />
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    Data
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="data"
                                    {...register("data", {
                                        value:dataFormatada,
                                        required: {
                                            value: true,
                                            message:
                                                "Data é obrigatorio",
                                        },
                                    })}
                                    defaultValue={dataFormatada}
                                />
                                {errors.data && (
                                    <span className="text-danger">
                                        {errors.data.message}
                                    </span>
                                )}
                            </Form.Group>
                            <hr />
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    Duração da operação
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={operacoes.duracao}
                                    name="duracao"
                                    {...register("duracao", {
                                        value: operacoes.duracao,
                                        required: {
                                            value: true,
                                            message:
                                                "Duração é obrigatório",
                                        },
                                    })}
                                />
                                {errors.duracao && (
                                    <span className="text-danger">
                                        {errors.duracao.message}
                                    </span>
                                )}
                            </Form.Group>
                            <hr />
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    Comandante
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={operacoes.comandante}
                                    name="comandante"
                                    {...register("comandante", {
                                        value: operacoes.comandante,
                                        required: {
                                            value: true,
                                            message:
                                                "Comandante é obrigatório",
                                        },
                                    })}
                                />
                                {errors.comandante && (
                                    <span className="text-danger">
                                        {errors.comandante.message}
                                    </span>
                                )}
                            </Form.Group>
                            <hr className="mb-5" />
                            <div className="d-flex w-100 btnResponsivo">
                                <div className="d-flex w-100 justify-content-start btnResponsivo">
                                    <button className={style.btnEditar} onClick={voltar}>
                                        Voltar
                                    </button>
                                </div>
                                <div className="w-100 d-flex justify-content-end btnResponsivo">
                                    <button type="submit" className={style.btnEditar}>
                                        Editar
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    );
}
