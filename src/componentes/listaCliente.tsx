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
        this.props.onDataChange(dadosCliente);
    };

    constructor(props) {
        super(props)
        this.state = { tela: 'Clientes', clientes: [] }
        this.buscarClientePeloID = this.buscarClientePeloID.bind(this)
        this.buscarClientes = this.buscarClientes.bind(this)
    }

    componentDidMount() {
        M.AutoInit();
        this.buscarClientes();
    }

    public buscarClientes() {
        let buscadorClientes = new BuscadorClientes()
        const clientesBuscados = buscadorClientes.buscar()
        clientesBuscados.then(clientes => {
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
                    clientes: this.todosClientes
                })
                break
            case '1':
                this.listarPorGenero('Masculino')
                break
            case '2':
                this.listarPorGenero('Feminino')
                break
            case '3':
                this.listarPorGenero('Outro')
                break
            case '4':
                this.listarOsDezClientesQueMaisConsumiramEmQuantidade()
                break
            case '5':
                this.listarOsCincoClientesQueMaisConsumiramEmValor()
                break
            case '6':
                this.listarOsDezClientesQueMenosConsumiramEmQuantidade()
                break
            case '7':
                this.listarOsDezClientesQueMenosConsumiramEmValor()
                break
        }

    }

    listarOsDezClientesQueMaisConsumiramEmQuantidade() {
        const todosClientes = this.todosClientes
        const clientesQueMaisConsumiramEmQuantidade = todosClientes.sort((a, b) => b.qtdConsumida - a.qtdConsumida).slice(0, 10);

        this.setState({
            clientes: clientesQueMaisConsumiramEmQuantidade
        })
    }

    listarPorGenero(genero: string) {
        const todosClientes = this.todosClientes

        const clientesPorGeneroEspecifico = todosClientes.filter(cliente => cliente.genero === genero);

        if (clientesPorGeneroEspecifico.length > 0) {
            this.setState({
                clientes: clientesPorGeneroEspecifico
            })
        } else {
            this.showToast(`Não existem clientes cadastrados do gênero ${genero}`)
        }
    }

    listarOsDezClientesQueMenosConsumiramEmQuantidade() {
        const todosClientes = this.todosClientes
        const clientesQueMenosConsumiramEmQuantidade = todosClientes.sort((a, b) => a.qtdConsumida - b.qtdConsumida).slice(0, 10);

        this.setState({
            clientes: clientesQueMenosConsumiramEmQuantidade
        })
    }

    listarOsDezClientesQueMenosConsumiramEmValor() {
        const todosClientes = this.todosClientes
        const clientesQueMenosConsumiramEmValor = todosClientes.sort((a, b) => a.valorConsumido - b.valorConsumido).slice(0, 10);

        this.setState({
            clientes: clientesQueMenosConsumiramEmValor
        })
    }

    listarOsCincoClientesQueMaisConsumiramEmValor() {
        const todosClientes = this.todosClientes
        const clientesQueMaisConsumiramEmValor = todosClientes.sort((a, b) => b.valorConsumido - a.valorConsumido).slice(0, 5);

        this.setState({
            clientes: clientesQueMaisConsumiramEmValor
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
                        <button onClick={this.buscarClientes} className={estituloBotaoRecarregar} style={{ margin: "5px" }} data-position="left" data-tooltip="Recarregar clientes">
                            <i className="material-icons left">refresh</i>
                        </button>                    
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">search</i>
                        <input id="icon_prefix" type="text" className="validate" onChange={(e) => this.buscarClientePeloID(e)} />
                        <label htmlFor="icon_prefix">Busca por ID</label>
                    </div>
                    <div className="input-field col s6">
                        <select defaultValue="0" onChange={(e) => this.listagemPersonalizada(e)}>
                            <option value="0">Todos os clientes</option>
                            <option value="1">Por gênero masculino</option>
                            <option value="2">Por gênero feminino</option>
                            <option value="3">Por gênero outro</option>
                            <option value="4">Os 10 clientes que mais consumiram, em quantidade</option>
                            <option value="5">Os 5 clientes que mais consumiram, em valor</option>
                            <option value="6">Os 10 clientes que menos consumiram, em quantidade</option>
                            <option value="7">Os 10 clientes que menos consumiram, em valor</option>
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
            let listaClientes = this.state.clientes.map((cliente) => (
                <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.sobreNome}</td>
                    <td>{cliente.genero}</td>
                    <td>{cliente.cpf}</td>
                    <td>{this.formatarTelefone(cliente.telefone)}</td>
                    <td>{cliente.qtdConsumida}</td>
                    <td>{this.formatarValor(cliente.valorConsumido)}</td>
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
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Gênero</th>
                                <th>CPF</th>
                                <th>DDD + Telefone</th>
                                <th>Qtd. itens consumidos</th>
                                <th>Valor(R$) em consumo</th>
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

    formatarTelefone(numero) {
        const numeroLimpo = numero?.toString().trim().replace(/\D/g, '');
      
        if (numeroLimpo?.length === 10) {
          return `(${numeroLimpo?.substr(0, 2)}) ${numeroLimpo.substr(2, 4)}-${numeroLimpo.substr(6, 4)}`;
        } else if (numeroLimpo?.length === 11) {
          return `(${numeroLimpo?.substr(0, 2)}) ${numeroLimpo.substr(2, 5)}-${numeroLimpo.substr(7, 4)}`;
        } else {
          return numero;
        }
      }
}