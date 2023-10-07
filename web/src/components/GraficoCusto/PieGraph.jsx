import React from 'react';
import ReactApexChart from 'react-apexcharts';

export function MyPieChart({ dadosAgregados }) {
  if (!dadosAgregados) {
    console.log('dados agregados não estão definidos');
    return null;
  }

  const options = {
    labels: dadosAgregados.map((item) => item.name),
    title: {
        text: 'Operações por cidade',
        align: 'center',
        margin: 10,
        style: {
          fontSize: '20px',
        }
    }
  };

  const series = dadosAgregados.map((item) => item.value);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      width="100%"
      height="300"
    />
  );
}
