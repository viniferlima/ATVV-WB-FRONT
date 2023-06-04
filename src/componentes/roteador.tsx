import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaCliente";
import ListaProdutoServico from "./listaProdutoServico";
import ListaConsumo from "./listaConsumo";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import FormularioCadastroProdutoServico from "./formularioCadastroProdutoServico";
import FormularioCadastroConsumo from "./formularioCadastroConsumo";

type state = {
    tela: string,
    dadosClienteAtualizacao: any
    dadosItemAtualizacao: any
    dadosConsumoAtualizacao: any
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes',
            dadosClienteAtualizacao: [],
            dadosItemAtualizacao: [],
            dadosConsumoAtualizacao: []
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    handleClienteDataChange = (dados) => {
        this.setState(prevState => ({
            dadosClienteAtualizacao: dados
        }));
    };

    handleItemDataChange = (dados) => {
        this.setState(prevState => ({
            dadosItemAtualizacao: dados
        }));
    };

    handleConsumoDataChange = (dados) => {
        this.setState(prevState => ({
            dadosConsumoAtualizacao: dados
        }));
    };

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="blue lighten-2" botoes={['Clientes', 'Produtos/Serviços', 'Consumos']} />

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente seletorView={this.selecionarView} dadosClienteAtualizacao={this.state.dadosClienteAtualizacao} onDataChange={this.handleClienteDataChange} titulo="Clientes" tema="blue lighten-2" />
                </>
            )
        } else if (this.state.tela === 'Produtos/Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <ListaProdutoServico seletorView={this.selecionarView} dadosItemAtualizacao={this.state.dadosItemAtualizacao} onDataChange={this.handleItemDataChange} titulo="Produtos/Serviços" tema="blue lighten-2" />
                </>
            )

        } else if (this.state.tela === 'Consumos') {
            return (
                <>
                    {barraNavegacao}
                    <ListaConsumo seletorView={this.selecionarView} dadosConsumoAtualizacao={this.state.dadosConsumoAtualizacao} onDataChange={this.handleConsumoDataChange} titulo="Consumos" tema="blue lighten-2"/>
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
                    <FormularioCadastroProdutoServico titulo="Cadastro de Item" tema="blue lighten-2" seletorView={this.selecionarView}  dadosItemAtualizacao={this.state.dadosItemAtualizacao} />
                </>
            )

        } else if (this.state.tela === 'Novo Consumo') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroConsumo titulo="Nova Compra" tema="blue lighten-2" seletorView={this.selecionarView}  dadosConsumoAtualizacao={this.state.dadosConsumoAtualizacao} />
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
                    <FormularioCadastroProdutoServico titulo="Alteração de Item" tema="blue lighten-2" seletorView={this.selecionarView} dadosItemAtualizacao={this.state.dadosItemAtualizacao} />
                </>
            )

        } else if (this.state.tela === 'Visualização da Compra') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroConsumo titulo="Visualização da Compra" tema="blue lighten-2" seletorView={this.selecionarView} dadosConsumoAtualizacao={this.state.dadosConsumoAtualizacao} />
                </>
            )
        }

    }
}