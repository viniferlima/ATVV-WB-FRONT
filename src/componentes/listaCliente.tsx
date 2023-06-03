/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import '../CSS/estilo.css';
import BuscadorClientes from "../buscadores/buscadorClientes";
import RemovedorCliente from "../removedores/removedorCliente";
import RemovedorClienteLocal from "../removedores/removedorClienteLocal";

type props = {
    titulo: string,
    tema: string,
    dadosClienteAtualizacao: any,
    seletorView: Function,
    onDataChange: Function
}

type state = {
    tela: string,
    clientes: any[],
}

export default class ListaCliente extends Component<props, state> {
    private todosClientes: any[]

    handleChange = (dados) => {
        const dadosCliente = dados;
        this.props.onDataChange(dados);
    };

    constructor(props) {
        super(props)
        this.state = { tela: 'Clientes', clientes: [] }
        this.buscarClientePeloID = this.buscarClientePeloID.bind(this)
    }

    componentDidMount() {
        M.AutoInit();
        this.buscarClientes();
    }

    public buscarClientes() {
        let buscadorClientes = new BuscadorClientes()
        const clientes = buscadorClientes.buscar()
        clientes.then(clientes => {
            this.setState({ clientes: clientes })
            this.todosClientes = clientes
        })
    }

    public buscarClientePeloID(id: any) {
        const idPesquisado = id.target.value
        if (idPesquisado != null && idPesquisado.toString().trim() != '') {
            let buscadorClientes = new BuscadorClientes()
            const retorno = buscadorClientes.buscarPeloID(idPesquisado)
            retorno.then((clientePesquisado) => {
                
                if (clientePesquisado?.id != null) {
                    let resultadoPesquisa: any[] = []
                    resultadoPesquisa.push(clientePesquisado)
                    this.setState(prevState => ({
                        clientes: resultadoPesquisa,
                    }));
                } else {
                    this.showToast(`Não foi encontrado nenhum cliente com o ID ${idPesquisado}`)
                }
            })
        } else {
            this.setState({ clientes: this.todosClientes })
        }
    }


    public excluirRemoto(idCliente: string) {
        let removedor = new RemovedorCliente()
        removedor.remover({ id: idCliente })
    }

    public excluirLocal(id: string, e: any) {
        e.preventDefault()
        let removedorLocal = new RemovedorClienteLocal()
        let clientes = removedorLocal.remover(this.state.clientes, id)
        this.setState({
            clientes: clientes
        })
        this.todosClientes = clientes
        this.excluirRemoto(id)
    }

    renderCamposPesquisa() {
        let estiloTitulo = `center-align blue-text teste`
        let titulo = `${this.props.titulo}`

        return (
            <>
                <h5 className={estiloTitulo}>{titulo}</h5>

                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">search</i>
                        <input id="icon_prefix" type="text" className="validate" onChange={(e) => this.buscarClientePeloID(e)} />
                        <label htmlFor="icon_prefix">Busca</label>
                    </div>
                    <div className="input-field col s6">
                        <select defaultValue="0">
                            <option value="0" disabled>Escolha como listar os clientes</option>
                            <option value="1">Todos os clientes por gênero</option>
                            <option value="2">Os 10 clientes que mais consumiram, em quantidade</option>
                            <option value="3">Os 5 clientes que mais consumiram, em valor</option>
                            <option value="4">Os 10 clientes que menos consumiram, em valor</option>
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
                <button onClick={(e) => this.props.seletorView('Novo Cliente', e)} className={estiloBotaoNovo} style={{ margin: "5px" }} type="submit" name="action">Novo
                    <i className="material-icons right">add</i>
                </button>
            </>
        )
    }

    render() {
        let estiloBotoesAcao = `btn-floating btn-small waves-effect waves-light btn tooltipped`
        let estiloBotaoEditar = `${estiloBotoesAcao} light-blue`
        let estiloBotaoDeletar = `${estiloBotoesAcao} red`
        let quantidadeClientes = this.state.clientes.length
        let camposPesquisa = this.renderCamposPesquisa()
        let botaoAdicionar = this.renderBotaoAdicionar()


        if (quantidadeClientes > 0) {
            let listaClientes = this.state.clientes.map((cliente, i) => (
                <tr key={i}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.sobreNome}</td>
                    <td>{this.getNumeroTelefoneFormatado(cliente.telefones[0])}</td>
                    <td>
                        <a className={estiloBotaoEditar} style={{ marginRight: "2px" }} href="#!" onClick={(e) => this.abreTelaAtualizacao(e, cliente)} data-position="left" data-tooltip="Alterar">
                            <i className="material-icons">edit</i>
                        </a>
                        <a className={estiloBotaoDeletar} href="" target={"_self"} onClick={(e) => this.excluirLocal(cliente['id'], e)} data-position="right" data-tooltip="Deletar">
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
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Telefone</th>
                                <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listaClientes}
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

    abreTelaAtualizacao(evento: any, cliente: any) {
        this.handleChange(cliente)
        this.props.seletorView('Alteração de Cliente', evento)
    }

    showToast(mensagem: string) {
        M.toast({ html: mensagem })
    }

    getNumeroTelefoneFormatado(telefone: any): string {
        if (telefone == null) {
            return 'Sem registro'
        } else {
            return `(${telefone.ddd}) ${telefone.numero}`
        }
    }
}