import React from 'react';
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from '../../components/Sidebar/sidebar';
import { Header } from '../../components/Header/header';
import { getOperacoes } from '../../services/operacao-service'

 import
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
 from 'recharts';

export function Dashboard() {
  const data = [
      {
        name: 'Page A',
        uv: 4000,
      },
      {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];

  const navigate = useNavigate();
  const [operacoes, setOperacoes] = useState();
  const [contaOperacao, setContaOperacao] = useState();
  
  useEffect(() => {
    getAllOp()
  }, []);

  async function getAllOp() {
    try {
        // const result = await getOperacoes();
        // setOperacoes(result.data);
        // contarOperacoes();
    } catch (error) {
        console.error(error);
        navigate("/");
    }
}
  const contarOperacoes = () => {
    console.log(operacoes);
  }

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <main className='main-container'>
      <Header OpenSidebar={OpenSidebar}/>
        <div className='d-flex w-100 vh-100'>
   
          <div>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          </div>
          <div className='p-3 w-75'>
            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>OPERAÇÕES</h3>
                    </div>
                    <h1>300</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CUSTOS</h3>
                    </div>
                    <h1>200</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>VEICULOS</h3>
                    </div>
                    <h1>33</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>AGENTES</h3>
                    </div>
                    <h1>42</h1>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
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
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
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
                </ResponsiveContainer>

            </div>

          </div>
        </div>


    </main>
  )
}
