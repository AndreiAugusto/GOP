import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function GerarPdfOperacao({ operacao, veiculos }) {
  const gerarPDF = () => {
    // Criar um novo documento PDF
    const doc = new jsPDF();

    // Adicionar título ao documento
    doc.text(`Relatório da Operação: ${operacao.nome}`, 10, 10);

    // Adicionar detalhes da operação
    doc.text(`Custo: ${operacao.custo.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })}`, 10, 20);
    doc.text(`Número de Agentes: ${operacao.nAgentes}`, 10, 30);
    doc.text(`Cidade: ${operacao.cidade}`, 10, 40);
    doc.text(`Data: ${new Date(operacao.data).toLocaleDateString('pt-BR')}`, 10, 50);
    doc.text(`Duração: ${operacao.duracao} dia(s)`, 10, 60);
    doc.text(`Comandante: ${operacao.comandante}`, 10, 70);

    // Adicionar tabela de veículos
    const tableData = veiculos.map((veiculo) => [
      veiculo.Veiculo.tipoVeiculo,
      veiculo.quantidade,
    ]);

    doc.autoTable({
      head: [["Tipo de Veículo", "Quantidade"]],
      body: tableData,
      startY: 80, // Defina a posição vertical da tabela
    });

    // Salvar ou exibir o PDF no navegador
    doc.save(`Relatorio_Operacao_${operacao.nome}.pdf`);
  };

  return (
    <div className="mt-auto mb-auto">
      <button className="btnVisualizar" onClick={gerarPDF}>Gerar PDF</button>
    </div>
  );
}

export default GerarPdfOperacao;
