/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import BuscadorConsumos from "../buscadores/buscadorConsumos";
import RemovedorConsumo from "../removedores/removedorConsumo";
import RemovedorConsumoLocal from "../removedores/removedorConsumoLocal";
import AtualizadorItem from "../atualizador/atualizadorItem";
import AtualizadorCliente from "../atualizador/atualizadorCliente";

type props = {
    titulo: string,
    tema: string,
    dadosConsumoAtualizacao: any,
    seletorView: Function,
    onDataChange: Function
}

type state = {
    tela: string,
    consumos: any[],
}

export default class ListaConsumo extends Component<props, state> {
    private todosConsumos: any[]

    constructor(props) {
        super(props)
        this.state = { tela: 'Consumos', consumos: [] }
        this.buscarConsumoPeloID = this.buscarConsumoPeloID.bind(this)
        this.buscarConsumos = this.buscarConsumos.bind(this)
    }

    componentDidMount() {
        M.AutoInit();
        this.buscarConsumos();
    }

    handleChange = (dados) => {
        const dadosItens = dados
        this.props.onDataChange(dadosItens)
    };

    public buscarConsumos() {
        let buscadorConsumos = new BuscadorConsumos()
        const consumosBuscados = buscadorConsumos.buscar()
        consumosBuscados.then(consumos => {
            this.setState({ consumos: consumos })
            this.todosConsumos = consumos
        })
    }

    public buscarConsumoPeloID(id: any) {
        const idPesquisado = id.target.value
        if (idPesquisado != null && idPesquisado.toString().trim() != '') {
            let buscadorConsumos = new BuscadorConsumos()
            const retorno = buscadorConsumos.buscarPeloID(idPesquisado)
            retorno.then((consumoPesquisado) => {

                if (consumoPesquisado?.id != null) {
                    let resultadoPesquisa: any[] = []
                    resultadoPesquisa.push(consumoPesquisado)
                    this.setState(prevState => ({
                        consumos: resultadoPesquisa,
                    }));
                } else {
                    this.showToast(`Não foi encontrado nenhum consumo com o ID ${idPesquisado}`)
                }
            })
        } else {
            this.setState({ consumos: this.todosConsumos })
        }
    }

    public excluirRemoto(idConsumo: string) {
        let removedorConsumo = new RemovedorConsumo()
        let atualizadorItem = new AtualizadorItem()
        let atualizadorCliente = new AtualizadorCliente()

        const consumoRemovido = this.state.consumos.find(consumo => consumo.id == idConsumo)
        let totalItens = 0

        consumoRemovido.itens.forEach(item => {
            totalItens += item.quantidade
        })

        atualizadorItem.subtrairQtdConsumida(consumoRemovido)
        atualizadorCliente.subtrairValoresConsumidos(consumoRemovido)

        removedorConsumo.remover({ id: idConsumo })
    }

    public excluirLocal(id: string, e: any) {
        e.preventDefault()
        let removedorLocal = new RemovedorConsumoLocal()
        let consumos = removedorLocal.remover(this.state.consumos, id)
        this.setState({
            consumos: consumos
        })
        this.todosConsumos = consumos
        this.excluirRemoto(id)
    }

    formatarValor(valor) {
        const formatter = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        return formatter.format(valor);
    }

    renderCamposPesquisa() {
        let estiloTitulo = `center-align blue-text`
        let estituloBotaoRecarregar = `btn-floating btn-small waves-effect waves-light btn tooltipped`
        
        let titulo = `${this.props.titulo}`
        return (
            <>
                <div className="row">
                    <div className="input-field col s11">
                        <h5 className={estiloTitulo}>{titulo}</h5>
                    </div>
                    <div className="input-field col s1">
                        <button onClick={this.buscarConsumos} className={estituloBotaoRecarregar} style={{ margin: "5px" }} data-position="left" data-tooltip="Recarregar consumos">
                            <i className="material-icons left">refresh</i>
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">search</i>
                        <input id="icon_prefix" type="text" className="validate" onChange={(e) => this.buscarConsumoPeloID(e)} />
                        <label htmlFor="icon_prefix">Busca por ID</label>
                    </div>
                    <div className="input-field col s6">
                        <select defaultValue="0" onChange={(e) => this.listagemPersonalizada(e)}>
                            <option value="0">Todos os consumos</option>
                            <option value="1">Por maior total</option>
                            <option value="2">Por menor total</option>
                        </select>
                    </div>
                </div>

            </>
        )
    }

    listarPorMaiorValorTotal() {
        const todosConsumos = this.todosConsumos

        const maiorValorTotal = todosConsumos.sort((a, b) => b.total - a.total);

        this.setState({
            consumos: maiorValorTotal
        })
    }

    listarPorMenorValorTotal() {
        const todosConsumos = this.todosConsumos

        const menorValorTotal = todosConsumos.sort((a, b) => a.total - b.total);

        this.setState({
            consumos: menorValorTotal
        })
    }

    renderBotaoAdicionar() {
        let estiloBotaoNovo = `btn waves-effect waves-light ${this.props.tema}`

        return (
            <>
                <button onClick={(e) => this.props.seletorView('Novo Consumo', e)} className={estiloBotaoNovo} style={{ margin: "5px" }} type="submit" name="action">Novo
                    <i className="material-icons right">add</i>
                </button>
            </>
        )
    }

    render() {
        let estiloBotoesAcao = `btn-floating btn-small waves-effect waves-light btn tooltipped`
        let estiloBotaoDeletar = `${estiloBotoesAcao} red`
        let estiloBotaoEditar = `${estiloBotoesAcao} light-blue`
        let quantidadeConsumos = this.state.consumos.length
        let camposPesquisa = this.renderCamposPesquisa()
        let botaoAdicionar = this.renderBotaoAdicionar()

        if (quantidadeConsumos > 0) {
            let listaConsumos = this.state.consumos.map((consumo) => (
                <tr key={consumo.id}>
                    <td>{consumo.id}</td>
                    <td>{consumo.dataCriacao}</td>
                    <td>
                        {this.formatarValor(consumo.total)}
                    </td>
                    <td>{consumo.cliente.cpf}</td>
                    <td>{consumo.cliente.nome}</td>
                    <td>
                        <a className={estiloBotaoEditar} style={{ marginRight: "2px" }} href="#" onClick={(e) => this.abreTelaAtualizacao(e, consumo)} data-position="left" data-tooltip="Visualizar">
                            <i className="material-icons">remove_red_eye</i>
                        </a>
                        <a className={estiloBotaoDeletar} href="#" target={"_self"} onClick={(e) => this.excluirLocal(consumo['id'], e)} data-position="right" data-tooltip="Deletar">
                            <i className="material-icons">delete</i>
                        </a>
                    </td>
                </tr>
            ))

            return (
                <>
                    {camposPesquisa}
                    <table className="highlight centered responsive-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data de criação</th>
                                <th>Total</th>
                                <th>CPF do cliente</th>
                                <th>Nome do Cliente</th>
                                <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listaConsumos}
                        </tbody>
                    </table>

                    {botaoAdicionar}
                </>
            )
        }
        else {
            return (
                <>
                    {camposPesquisa}
                    {botaoAdicionar}
                </>
            )
        }
    }

    abreTelaAtualizacao(evento: any, consumo: any) {
        this.handleChange(consumo)
        this.props.seletorView('Visualização da Compra', evento)
    }

    showToast(mensagem: string) {
        M.toast({ html: mensagem })
    }

    listagemPersonalizada(evento: any) {
        const opcaoSelecionada = evento.target.value

        switch (opcaoSelecionada) {
            case '0':
                this.setState({
                    consumos: this.todosConsumos
                })
                break
            case '1':
                this.listarPorMaiorValorTotal()
                break
            case '2':
                this.listarPorMenorValorTotal()
                break
        }

    }
}