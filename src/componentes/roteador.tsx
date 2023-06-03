import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaCliente";
import ListaProdutoServico from "./listaProdutoServico";
import ListaConsumo from "./listaConsumo";
import { Cliente } from "../models/cliente";
import { ProdutoServico } from "../models/produtoServico";
import { Consumo } from "../models/consumo";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import FormularioCadastroProdutoServico from "./formularioCadastroProdutoServico";
import FormularioCadastroConsumo from "./formularioCadastroConsumo";

type state = {
    tela: string,
    dadosClienteAtualizacao: any
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes',
            dadosClienteAtualizacao: []
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    handleDataChange = (dados) => {
        this.setState({ dadosClienteAtualizacao: dados });
    };

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="blue lighten-2" botoes={['Clientes', 'Produtos/Serviços', 'Consumos']} />
        let listaClientes = this.getClientes();
        let listaProdutosServicos = this.getProdutosServicos();
        let listaConsumos = this.getConsumos();

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente seletorView={this.selecionarView} dadosClienteAtualizacao={this.state.dadosClienteAtualizacao} onDataChange={this.handleDataChange} titulo="Clientes" tema="blue lighten-2" />
                </>
            )
        } else if (this.state.tela === 'Produtos/Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <ListaProdutoServico seletorView={this.selecionarView} titulo="Produtos/Serviços" tema="blue lighten-2" produtosServicos={listaProdutosServicos} />
                </>
            )

        } else if (this.state.tela === 'Consumos') {
            return (
                <>
                    {barraNavegacao}
                    <ListaConsumo seletorView={this.selecionarView} titulo="Consumos" tema="blue lighten-2" consumos={listaConsumos} />
                </>
            )
        } else if (this.state.tela === 'Novo Cliente') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente titulo="Cadastro de Cliente" tema="blue lighten-2" seletorView={this.selecionarView}  dadosClienteAtualizacao={this.state.dadosClienteAtualizacao} />
                </>
            )

        } else if (this.state.tela === 'Novo Item') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroProdutoServico titulo="Cadastro de Item" tema="blue lighten-2" />
                </>
            )

        } else if (this.state.tela === 'Novo Consumo') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroConsumo titulo="Nova Compra" tema="blue lighten-2" />
                </>
            )

        } else if (this.state.tela === 'Alteração de Cliente') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente titulo="Alteração de Cliente" tema="blue lighten-2" seletorView={this.selecionarView} dadosClienteAtualizacao={this.state.dadosClienteAtualizacao} />
                </>
            )

        } else if (this.state.tela === 'Alteração de Item') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroProdutoServico titulo="Alteração de Item" tema="blue lighten-2" />
                </>
            )

        }

    }

    getClientes(): Cliente[] {
        let listaClientes: Cliente[] = [];
        let clienteA: Cliente = new Cliente();
        let clienteB: Cliente = new Cliente();
        let clienteC: Cliente = new Cliente();

        clienteA.setNome('Vinicius Fernandes');
        clienteA.setCpf('489.238.728-25');
        clienteA.setIdade(24);

        clienteB.setNome('Heloisa Sayuri');
        clienteB.setCpf('145.785.987-20');
        clienteB.setIdade(30);

        clienteC.setNome('Victor de Lima');
        clienteC.setCpf('874.478.897-10');
        clienteC.setIdade(13);

        listaClientes.push(clienteA);
        listaClientes.push(clienteB);
        listaClientes.push(clienteC);

        return listaClientes;
    }

    getProdutosServicos(): ProdutoServico[] {
        let listaProdutosServicos: ProdutoServico[] = [];
        let itemA: ProdutoServico = new ProdutoServico();
        let itemB: ProdutoServico = new ProdutoServico();
        let itemC: ProdutoServico = new ProdutoServico();

        itemA.setNome('Corte de Cabelo');
        itemA.setPreco(60.00);
        itemA.setTipo('Serviço');

        itemB.setNome('Shampoo');
        itemB.setPreco(100.00);
        itemB.setTipo('Produto');

        itemC.setNome('Esmalte');
        itemC.setPreco(15.00);
        itemC.setTipo('Produto');

        listaProdutosServicos.push(itemA);
        listaProdutosServicos.push(itemB);
        listaProdutosServicos.push(itemC);

        return listaProdutosServicos;
    }

    getConsumos(): Consumo[] {
        let listaConsumos: Consumo[] = [];
        let consumoA: Consumo = new Consumo();
        let consumoB: Consumo = new Consumo();
        let consumoC: Consumo = new Consumo();

        consumoA.setId(1);
        consumoA.setData('01/03/2023');
        consumoA.setTotal(105.00);
        consumoA.setCpfDoCliente('874.478.897-10');
        consumoA.setItemDescricao('Shampoo');

        consumoB.setId(2);
        consumoB.setData('20/05/2023');
        consumoB.setTotal(500.00);
        consumoB.setCpfDoCliente('145.785.987-20');
        consumoB.setItemDescricao('Esmalte');

        consumoC.setId(3);
        consumoC.setData('17/03/2020');
        consumoC.setTotal(300.00);
        consumoC.setCpfDoCliente('489.238.728-25');
        consumoC.setItemDescricao('Corte de cabelo');

        listaConsumos.push(consumoA);
        listaConsumos.push(consumoB);
        listaConsumos.push(consumoC);

        return listaConsumos;
    }
}