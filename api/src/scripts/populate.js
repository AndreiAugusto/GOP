require('../database');

const { VeiculoModel } = require('../models/veiculos-model');
const { OperacoesModel } = require('../models/operacoes-model');
const { OperacaoVeiculoModel } = require('../models/operacao-veiculo-model');

const veiculos = [
    {
        tipoVeiculo: 'Caminhonete'
    },
    {
        tipoVeiculo: 'Caminhão'
    },
    {
        tipoVeiculo: 'Moto'
    }
];

const operacoes = [
    {
        nome: 'Operação A',
        custo: '5000',
        nAgentes: '2',
        cidade: 'Sorriso',
        data: '2023-10-02 20:00:00-04',
        duracao: '2',
        comandante: 'Rogerio Ceni'
    },
    {
        nome: 'Operação O',
        custo: '4400',
        nAgentes: '4',
        cidade: 'Várzea Grande',
        data: '2022-07-01 17:00:00-04',
        duracao: '3',
        comandante: 'Camila Santos'
    },
    {
        nome: 'Operação N',
        custo: '5600',
        nAgentes: '5',
        cidade: 'Cuiabá',
        data: '2022-08-15 14:00:00-04',
        duracao: '4',
        comandante: 'Marcos Oliveira'
    },
    {
        nome: 'Operação M',
        custo: '3700',
        nAgentes: '3',
        cidade: 'Sinop',
        data: '2022-09-05 09:30:00-04',
        duracao: '2',
        comandante: 'Sandra Souza'
    },
    {
        nome: 'Operação L',
        custo: '5200',
        nAgentes: '4',
        cidade: 'Rondonópolis',
        data: '2022-10-12 12:15:00-04',
        duracao: '3',
        comandante: 'Roberto Lima'
    },
    {
        nome: 'Operação J',
        custo: '6000',
        nAgentes: '4',
        cidade: 'Cuiabá',
        data: '2022-12-10 13:20:00-04',
        duracao: '3',
        comandante: 'Fernando Santos'
    },
    {
        nome: 'Operação I',
        custo: '3500',
        nAgentes: '3',
        cidade: 'Cuiabá',
        data: '2023-01-15 07:30:00-04',
        duracao: '2',
        comandante: 'Marta Oliveira'
    }

];

const opVeiculos = [
    {
        quantidade: 2,
        operacaoId: 1,
        veiculoId: 1
    },
    {
        quantidade: 2,
        operacaoId: 2,
        veiculoId: 1
    },
    {
        quantidade: 2,
        operacaoId: 3,
        veiculoId: 1
    },
    {
        quantidade: 2,
        operacaoId: 4,
        veiculoId: 1
    },
    {
        quantidade: 2,
        operacaoId: 5,
        veiculoId: 1
    },
    {
        quantidade: 2,
        operacaoId: 6,
        veiculoId: 1
    },
    {
        quantidade: 2,
        operacaoId: 7,
        veiculoId: 1
    },
    {
        quantidade: 2,
        operacaoId: 1,
        veiculoId: 2
    },
    {
        quantidade: 2,
        operacaoId: 2,
        veiculoId: 2
    },
    {
        quantidade: 2,
        operacaoId: 3,
        veiculoId: 2
    }

];



(async () => {
    for (let veiculo of veiculos) {
        await VeiculoModel.create({
            tipoVeiculo: veiculo.tipoVeiculo
        });
    }
    for(let operacao of operacoes) {
        await OperacoesModel.create({
            nome: operacao.nome,
            custo: operacao.custo,
            nAgentes: operacao.nAgentes,
            cidade: operacao.cidade,
            data: operacao.data,
            duracao: operacao.duracao,
            comandante: operacao.comandante
    });
    }
    for(let opVeiculo of opVeiculos){
        await OperacaoVeiculoModel.create({
            quantidade: opVeiculo.quantidade,
            operacaoId: opVeiculo.operacaoId,
            veiculoId: opVeiculo.veiculoId
        })
    }

    console.log('Tudo cadastrado!');
})();
