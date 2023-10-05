import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Plugin para criar tabelas em PDF com jsPDF

function GerarPDF({ operacoes, veiculos, opVeiculo }) {
  const gerarPDF = () => {
    // Criar um novo documento PDF
    const doc = new jsPDF();

    // Definir o título do documento
    doc.text("Relatório de Operações e Veículos", 10, 10);

    // Adicionar detalhes das operações
    operacoes.forEach((operacao) => {
      doc.setFontSize(14);
      doc.text(`Operação: ${operacao.nome}`, 10, 20);
      doc.setFontSize(12);
      doc.text(`Custo: R$ ${operacao.custo.toFixed(2)}`, 10, 30);
      doc.text(`Número de Agentes: ${operacao.nAgentes}`, 10, 40);
      doc.text(`Cidade: ${operacao.cidade}`, 10, 50);
      doc.text(`Data: ${operacao.data}`, 10, 60);
      doc.text(`Duração: ${operacao.duracao} dia(s)`, 10, 70);
      doc.text(`Comandante: ${operacao.comandante}`, 10, 80);

      // Encontrar os detalhes dos veículos para esta operação
      const detalhesVeiculos = opVeiculo.filter(
        (item) => item.operacaoId === operacao.id
      );

      if (detalhesVeiculos.length > 0) {
        doc.setFontSize(12);
        doc.text("Detalhes dos Veículos:", 10, 100);

        // Criar uma matriz de dados para a tabela de veículos
        const veiculosData = detalhesVeiculos.map((detalhe) => {
          const veiculo = veiculos.find((v) => v.id === detalhe.veiculoId);
          return [veiculo.tipoVeiculo, detalhe.quantidade];
        });

        // Definir o cabeçalho da tabela de veículos
        const veiculosHeaders = ["Tipo de Veículo", "Quantidade"];

        // Adicionar a tabela de veículos ao documento PDF
        doc.autoTable({
          head: [veiculosHeaders],
          body: veiculosData,
          startY: 110,
        });
      }

      doc.addPage(); // Adicionar uma nova página para a próxima operação
    });

    // Salvar ou exibir o PDF no navegador
    doc.save("relatorio_operacoes_veiculos.pdf");
  };

  return (
    <div className="mt-auto mb-auto">
      <button className="btnVisualizar" onClick={gerarPDF}>Gerar PDF</button>
    </div>
  );
}

export default GerarPDF;
