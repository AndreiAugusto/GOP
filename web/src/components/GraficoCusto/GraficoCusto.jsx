import React from 'react';
import ReactApexChart from 'react-apexcharts';

export function MyBarChart({ custoAgregados }) {
  if (!custoAgregados) {
    console.log('custosAgregados não está definido');
    return null;
  }

  const options = {
    chart: {
      id: 'bar-chart',
    },
    xaxis: {
      categories: custoAgregados.map((item) => item.name),
    },
    title: {
        text: 'Custo de operações por cidade',
        align: 'center',
        margin: 10,
        style: {
          fontSize: '20px',
        }
    }
  };

  const series = [
    {
      name: 'Custo',
      data: custoAgregados.map((item) => item.custo),
    },
  ];

  return (
    <ReactApexChart

      options={options}
      series={series}
      type="bar"
      width="100%"
      height="300"
    />
  );
}

