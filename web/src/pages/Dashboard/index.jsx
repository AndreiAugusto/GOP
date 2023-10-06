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
} from "../../services/operacao-service";
import { getSomaTotalVeiculos } from '../../services/operacao-veiculo-service';

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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);

    useEffect(() => {
        pedaDados().then((data) => {
            setOperacoes(data);
        });
        countOp();
        somaCustoOp();
        qtdVeiculos();
        qtdAgentes();

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
            console.log(dadosAgregados)
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
            const result = await getSomaTotalVeiculos();
            setSomaVeiculos(result.data[0].soma_quantidade);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function somaCustoOp() {
        try {
            const result = await somaCustoOperacoes();
            if(result.data){
                await setSomaCusto(
                    result.data.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })
                );
            }
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


    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const cores = [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
        '#A5A5A5',
        '#FF6633',
        '#FF33CC',
        '#66FF33',
        '#33CCFF',
        '#FF3366',
        '#33FFCC',
        '#CC33FF',
        '#99FF33'
      ];

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
                        <div className="card">
                            <div className="card-inner">
                                <h3>Total operações</h3>
                            </div>
                            <h1 className="font18">{nOperacoes ? nOperacoes : 0}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Custo total</h3>
                            </div>
                            <h1 className="font18">{somaCusto ? somaCusto : 0}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Total veículos</h3>
                            </div>
                            <h1 className="font18">{somaVeiculos ? somaVeiculos : 0}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Total agentes</h3>
                            </div>
                            <h1 className="font18">{somaAgentes ? somaAgentes : 0}</h1>
                        </div>
                    </div>


                        {operacoes && operacoes.length > 0 ?  (
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
                                                <Bar key='name' dataKey='custo' fill="#28166f"/>

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
                            </div>
                        ): <div></div>}
                </div>
            </div>
        </main>
    );
}
