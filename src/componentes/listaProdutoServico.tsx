/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import BuscadorItens from "../buscadores/buscadorItens";
import RemovedorItem from "../removedores/removedorItem";
import RemovedorItemLocal from "../removedores/removedorItemLocal";
import BuscadorConsumos from "../buscadores/buscadorConsumos";

type props = {
    titulo: string,
    tema: string,
    dadosItemAtualizacao: any,
    seletorView: Function,
    onDataChange: Function
}

type state = {
    tela: string,
    itens: any[],
}

export default class ListaProdutoServico extends Component<props, state> {
    private todosItens: any[]

    constructor(props) {
        super(props)
        this.state = { tela: 'Produtos/Serviços', itens: [] }
        this.buscarItemPeloID = this.buscarItemPeloID.bind(this)
        this.buscarItens = this.buscarItens.bind(this)
    }

    componentDidMount() {
        M.AutoInit()
        this.buscarItens()
    }

    handleChange = (dados) => {
        const dadosItens = dados
        this.props.onDataChange(dadosItens)
    };

    public buscarItens() {
        let buscadorItens = new BuscadorItens()
        const itensBuscados = buscadorItens.buscar()
        itensBuscados.then(itens => {
            this.setState(prevState => ({ itens: itens }))
            this.todosItens = itens
        })
    }

    public buscarItemPeloID(id: any) {
        const idPesquisado = id.target.value
        if (idPesquisado != null && idPesquisado.toString().trim() != '') {
            let buscadorItens = new BuscadorItens()
            const retorno = buscadorItens.buscarPeloID(idPesquisado)
            retorno.then((itemPesquisado) => {
                console.log(itemPesquisado)
                if (itemPesquisado?.id != null) {
                    let resultadoPesquisa: any[] = []
                    resultadoPesquisa.push(itemPesquisado)
                    this.setState(prevState => ({
                        itens: resultadoPesquisa,
                    }));
                } else {
                    this.showToast(`Não foi encontrado nenhum produto/serviço com o ID ${idPesquisado}`)
                }
            })
        } else {
            this.setState({ itens: this.todosItens })
        }
    }


    public excluirRemoto(idItem: string) {
        let removedor = new RemovedorItem()
        removedor.remover({ id: idItem })
    }

    public excluirLocal(id: string, e: any) {
        e.preventDefault()
        let removedorLocal = new RemovedorItemLocal()
        let itens = removedorLocal.remover(this.state.itens, id)
        this.setState({
            itens: itens
        })
        this.todosItens = itens
        this.excluirRemoto(id)
    }

    formatarValor(valor) {
        const formatter = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return formatter.format(valor);
    }

    listagemPersonalizada(evento: any) {
        const opcaoSelecionada = evento.target.value

        switch (opcaoSelecionada) {
            case '0':
                this.setState({
                    itens: this.todosItens
                })
                break
            case '1':
                this.listarOsItensMaisConsumidos()
                break
            case '2':
                this.listarOsItensMaisConsumidosPorGênero('Masculino')
                break
            case '3':
                this.listarOsItensMaisConsumidosPorGênero('Feminino')
                break
            case '4':
                this.listarOsItensMaisConsumidosPorGênero('Outro')
                break
        }
    }

    listarOsItensMaisConsumidos() {
        const todosItens = this.todosItens
        const itensMaisConsumidos = todosItens.sort((a, b) => b.qtdConsumida - a.qtdConsumida);

        this.setState({
            itens: itensMaisConsumidos
        })
    }

    listarOsItensMaisConsumidosPorGênero(genero: string) {
        const todosItens = this.todosItens
        let itensMaisConsumidosPorGenero = []

        if (genero === 'Masculino') {
            itensMaisConsumidosPorGenero = todosItens.sort((a, b) => b.qtdConsumidaGeneroMasculino - a.qtdConsumidaGeneroMasculino);
        } else if (genero === 'Feminino') {
            itensMaisConsumidosPorGenero = todosItens.sort((a, b) => b.qtdConsumidaGeneroFeminino - a.qtdConsumidaGeneroFeminino);
        } else {
            itensMaisConsumidosPorGenero = todosItens.sort((a, b) => b.qtdConsumidaGeneroOutro - a.qtdConsumidaGeneroOutro);
        }

        this.setState({
            itens: itensMaisConsumidosPorGenero
        })
    }

    renderCamposPesquisa() {
        let estiloTitulo = `center-align blue-text`
        let estituloBotaoRecarregar = `btn-floating btn-small waves-effect waves-light btn tooltipped`
        let titulo = `${this.props.titulo}`
        return (
            <>
                <div className="row">
                    <div className="input-field col s10 xl11">
                        <h5 className={estiloTitulo}>{titulo}</h5>
                    </div>
                    <div className="input-field col s2 xl1">
                        <button onClick={this.buscarItens} className={estituloBotaoRecarregar} style={{ margin: "5px" }} data-position="left" data-tooltip="Recarregar itens">
                            <i className="material-icons left">refresh</i>
                        </button>                    
                    </div>
                </div>
                

                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">search</i>
                        <input id="icon_prefix" type="text" className="validate" onChange={(e) => this.buscarItemPeloID(e)} />
                        <label htmlFor="icon_prefix">Busca por ID</label>
                    </div>
                    <div className="input-field col s6">
                        <select defaultValue="0" onChange={(e) => this.listagemPersonalizada(e)}>
                            <option value="0">Todos os itens</option>
                            <option value="1">Itens mais consumidos</option>
                            <option value="2">Itens mais consumidos do gênero masculino</option>
                            <option value="3">Itens mais consumidos do gênero feminino</option>
                            <option value="4">Itens mais consumidos do gênero outro</option>
                        </select>
                    </div>
                </div>

            </>
        )
    }

    renderBotaoAdicionar() {
        let estiloBotaoNovo = `btn waves-effect waves-light ${this.props.tema}`

        return (
            <>
                <button onClick={(e) => this.props.seletorView('Novo Item', e)} className={estiloBotaoNovo} style={{ margin: "5px" }} type="submit" name="action">Novo
                    <i className="material-icons right">add</i>
                </button>
            </>
        )
    }

    render() {
        let estiloBotoesAcao = `btn-floating btn-small waves-effect waves-light btn tooltipped`
        let estiloBotaoEditar = `${estiloBotoesAcao} light-blue`
        let estiloBotaoDeletar = `${estiloBotoesAcao} red`
        let quantidadeItens = this.state.itens.length
        let camposPesquisa = this.renderCamposPesquisa()
        let botaoAdicionar = this.renderBotaoAdicionar()

        if (quantidadeItens > 0) {
            let listaItens = this.state.itens.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>
                    {this.formatarValor(item.preco)}
                    </td>
                    <td>{item.tipo}</td>
                    <td>{item.qtdConsumida}</td>
                    <td>{item.qtdConsumidaGeneroMasculino}</td>
                    <td>{item.qtdConsumidaGeneroFeminino}</td>
                    <td>{item.qtdConsumidaGeneroOutro}</td>
                    <td>
                        <a className={estiloBotaoEditar} style={{ marginRight: "2px" }} href="#!" onClick={(e) => this.abreTelaAtualizacao(e, item)} data-position="left" data-tooltip="Alterar">
                            <i className="material-icons">edit</i>
                        </a>
                        <a className={estiloBotaoDeletar} href="" target={"_self"} onClick={(e) => this.excluirLocal(item['id'], e)} data-position="right" data-tooltip="Deletar">
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
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Tipo</th>
                                <th>Qtd. total consumida</th>
                                <th>Gênero Masculino</th>
                                <th>Gênero Feminino</th>
                                <th>Gênero Outro</th>
                                <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listaItens}
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

    abreTelaAtualizacao(evento: any, item: any) {
        this.handleChange(item)
        this.props.seletorView('Alteração de Item', evento)
    }

    showToast(mensagem: string) {
        M.toast({ html: mensagem })
    }
}