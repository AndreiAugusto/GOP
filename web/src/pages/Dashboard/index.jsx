import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { Header } from "../../components/Header/header";
import {
    countOperacoes,
    getOperacoes,
    somaAgentesOperacoes,
    somaCustoOperacoes,
    somaVeiculosOpereacoes,
} from "../../services/operacao-service";

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
} from "recharts";

export function Dashboard() {
    const navigate = useNavigate();
    const [nOperacoes, setNOperacoes] = useState(0);
    const [somaCusto, setSomaCusto] = useState(0);
    const [somaVeiculos, setSomaVeiculos] = useState(0);
    const [somaAgentes, setSomaAgentes] = useState(0);
    const [operacoes, setOperacoes] = useState();
    const [dadosAgregados, setDadosAgregados] = useState();
    const [custoAgregados, setCustoAgregados] = useState();

    useEffect(() => {
        pedaDados().then((data) => {
            setOperacoes(data);
        });
        countOp();
        somaCustoOp();
        qtdVeiculos();
        qtdAgentes();
    }, []);

    useEffect(() => {
        if(operacoes){
            // Configurando numero de operações por cidade
            const agregarDados = () => {
                const novoDadosAgregados = {};

                operacoes.forEach((item) => {
                    const cidade = item.cidade;
                    if (novoDadosAgregados[cidade]) {
                        novoDadosAgregados[cidade] += 1;
                    } else {
                        novoDadosAgregados[cidade] = 1;
                    }
                });
                return novoDadosAgregados;
            };

            const dados = agregarDados();

            const dadosFormatados = Object.keys(dados).map((cidade) => ({
                name: cidade,
                value: dados[cidade],
              }));
            setDadosAgregados(dadosFormatados);

            // Configurando custo por cidade
            const custoPorCidade = {};

            operacoes.forEach((item) => {
                const cidade = item.cidade;
                const custo = item.custo;

                if (custoPorCidade[cidade]) {
                    custoPorCidade[cidade] += custo;
                } else {
                    custoPorCidade[cidade] = custo;
                }
            });


            const custoFormatado = Object.keys(custoPorCidade).map((cidade) => ({
                name: cidade,
                custo: custoPorCidade[cidade],
              }));
            setCustoAgregados(custoFormatado);
            console.log(custoAgregados);
        } else{
            console.log('Operações nao estava setado')
        }
    }, [operacoes]);

    async function pedaDados() {
        try {
            const result = await getOperacoes();
            return result.data;
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function qtdAgentes() {
        try {
            const result = await somaAgentesOperacoes();
            setSomaAgentes(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function qtdVeiculos() {
        try {
            const result = await somaVeiculosOpereacoes();
            setSomaVeiculos(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function somaCustoOp() {
        try {
            const result = await somaCustoOperacoes();
            await setSomaCusto(
                result.data.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })
            );
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function countOp() {
        try {
            const result = await countOperacoes();
            setNOperacoes(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const cores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Conjunto de cores

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
                    <div className="main-cards">
                        <a href="/operacoes">
                            <div className="card">
                                <div className="card-inner">
                                    <h3>OPERAÇÕES</h3>
                                </div>
                                <h1 className="font18">{nOperacoes}</h1>
                            </div>
                        </a>
                        <div className="card">
                            <div className="card-inner">
                                <h3>CUSTOS</h3>
                            </div>
                            <h1 className="font13">{somaCusto}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>VEICULOS</h3>
                            </div>
                            <h1 className="font18">{somaVeiculos}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>AGENTES</h3>
                            </div>
                            <h1 className="font18">{somaAgentes}</h1>
                        </div>
                    </div>

                    <div className="charts">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                            width={500}
                            height={300}
                            data={custoAgregados}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                {custoAgregados ? (
                                        <Bar key='name' dataKey='custo' fill="#0088FE"/>

                                    ): console.log('custosAgregados nao estava setado')}
                            </BarChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={dadosAgregados}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                {dadosAgregados? dadosAgregados.map((item, index) => (
                                    <Cell key={item.name} dataKey="custo" fill={cores[index]}/>
                                )) : console.log('dados agregados nao estava setado')
                                }
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>

                    {/* <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                        </ResponsiveContainer> */}
                    </div>
                </div>
            </div>
        </main>
    );
}
