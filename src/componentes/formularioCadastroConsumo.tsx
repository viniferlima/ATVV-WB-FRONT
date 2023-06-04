import { Component } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BuscadorClientes from "../buscadores/buscadorClientes";
import BuscadorItens from "../buscadores/buscadorItens";
import CadastradorConsumo from "../cadastradores/cadastradorConsumo";
import AtualizadorItem from "../atualizador/atualizadorItem";
import AtualizadorCliente from "../atualizador/atualizadorCliente";

type props = {
    titulo: string,
    seletorView: Function,
    tema: string,
    dadosConsumoAtualizacao: any
}

type state = {
    clientesSelect: any[],
    itensSelect: any[]
    produtoServicoSelecionado: any,
    clienteSelecionado: any,
    dadosConsumo: any,
    isCamposDesabilitados: boolean
}

export default class FormularioCadastroConsumo extends Component<props, state> {
    private todosProdutosServicos: any[]
    private todosClientes: any[]

    constructor(props) {
        super(props)
        this.state = { clientesSelect: [], itensSelect: [], produtoServicoSelecionado: null, clienteSelecionado: [], dadosConsumo: [], isCamposDesabilitados: false }
        this.buscarClientes = this.buscarClientes.bind(this)
        this.buscarItens = this.buscarItens.bind(this)
        this.submeterFormulario = this.submeterFormulario.bind(this)
    }

    componentDidMount(): void {
        M.AutoInit()
        this.buscarClientes()
        this.buscarItens()
    }

    componentWillMount(): void {
        if (this.props.titulo == 'Visualização da Compra') {
            this.setState({
                dadosConsumo: this.props.dadosConsumoAtualizacao,
                isCamposDesabilitados: true
            });
        } else {
            this.setState({
                dadosConsumo: {
                    id: '',
                    dataCriacao: '',
                    total: 0,
                    cliente: {
                        id: '',
                        nome: '',
                        sobreNome: '',
                        cpf: '',
                        email: '',
                        telefone: {
                            numero: '',
                            ddd: ''
                        },
                        estado: '',
                        cidade: '',
                        rua: '',
                        bairro: '',
                        numero: '',
                        codigoPostal: '',
                        informacoesAdicionais: '',
                    },
                    itens: {
                        id: '',
                        quantidade: '',
                        subtotal: '',
                        produtoServico: {
                            id: '',
                            nome: '',
                            preco: '',
                            tipo: '',
                            genero: '',
                            qtdConsumida: ''
                        }
                    }
                }
            });
        }
    }

    public buscarClientes() {
        let buscadorClientes = new BuscadorClientes()
        const clientes = buscadorClientes.buscar()
        clientes.then(clientes => {
            this.todosClientes = clientes
            const clientesSelect = []
            clientes.forEach(cliente => {
                const objeto = {label: cliente.nome, id: cliente.id}
                clientesSelect.push(objeto)
            });
            this.setState({ clientesSelect: clientesSelect })
        })
    }

    public buscarItens() {
        let buscadorItens = new BuscadorItens()
        const itens = buscadorItens.buscar()
        itens.then(itens => {
            this.todosProdutosServicos = itens
            const itensSelect = []
            itens.forEach(item => {
                const objeto = {label: item.nome, id: item.id}
                itensSelect.push(objeto)
            });
            this.setState({ itensSelect: itensSelect })
        })
    }

    handleProdutoServicoSelected = (event, value) => {
        if (value != null) {
            const idProdutoServico = value.id
            this.setState({ produtoServicoSelecionado: idProdutoServico });
        }
    };

    handleClienteSelected = (event, value) => {
        if (value != null) {
            const idCliente = value.id
            const novoClienteSelecionado = this.todosClientes.find(cliente => cliente.id == idCliente)

            this.setState(prevState => ({
                dadosConsumo: {
                    ...prevState.dadosConsumo,
                    cliente: novoClienteSelecionado
                }
            }));
        }
    };

    handleAddItem = (event) => {
        const itensCarrinho = this.state.dadosConsumo.itens
        const produtoServicoAdicionado = this.todosProdutosServicos.find(item => item.id == this.state.produtoServicoSelecionado)

        if (produtoServicoAdicionado != null) {

            var novoItem: any = {
                quantidade: 0,
                subtotal: 0,
                produtoServico: []
            };

            novoItem.produtoServico = produtoServicoAdicionado
            novoItem.quantidade = 1
            novoItem.subtotal = novoItem.produtoServico.preco * novoItem.quantidade

            if (Array.isArray(itensCarrinho)) {
                itensCarrinho.push(novoItem);
            } else {
                this.setState(prevState => ({
                    dadosConsumo: {
                        ...prevState.dadosConsumo,
                        total: novoItem.subtotal,
                        itens: [novoItem]
                    }
                }));
                return;
            }

            const somaTotal = itensCarrinho.reduce((acumulador, item) => {
                return acumulador + item.subtotal;
            }, 0);

            this.setState(prevState => ({
                dadosConsumo: {
                    ...prevState.dadosConsumo,
                    total: somaTotal,
                    itens: itensCarrinho
                }
            }));
        }
    };

    formatarValor(valor) {
        const formatter = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return formatter.format(valor);
    }

    setDataAtual() {
        const data = new Date();
        const dia = ("0" + data.getDate()).slice(-2);
        const mes = ("0" + (data.getMonth() + 1)).slice(-2);
        const ano = data.getFullYear();
        const horas = ("0" + data.getHours()).slice(-2);
        const minutos = ("0" + data.getMinutes()).slice(-2);
      
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
      }

    public submeterFormulario(evento: any) {
        evento.preventDefault()

        let consumo = {
            id: null,
            dataCriacao: this.setDataAtual(),
            total: this.state.dadosConsumo.total,
            itens: this.state.dadosConsumo.itens,
            cliente: this.state.dadosConsumo.cliente,
        };

        this.efetuaCadastro(consumo)
        this.adicionarItemQtdConsumida(consumo).then(() => {
            this.adicionarClienteValoresConsumidos(consumo).then(() => {
                this.props.seletorView('Consumos', evento)
                evento.target.reset()
            })
        })
    }

    public cadastrarConsumo(objeto: Object) {
        let cadastrador = new CadastradorConsumo()
        cadastrador.cadastrar(objeto)
    }

    public adicionarItemQtdConsumida(consumo: any) {
        let atualizador = new AtualizadorItem()
                
        consumo.itens.forEach(item => {
            atualizador.adicionarQtdConsumida(consumo)
        })

        return Promise.resolve()
    }

    public adicionarClienteValoresConsumidos(consumo: any) {
        let atualizador = new AtualizadorCliente()
        
        atualizador.adicionarValoresConsumidos(consumo)
        return Promise.resolve()
    }

    efetuaCadastro(consumo: any) {
        this.cadastrarConsumo(consumo);
    }

    capturarQtd(evento, i) {
        const quantidadeAlterada = evento.target.value
        const itensCarrinho = this.state.dadosConsumo.itens

        if (quantidadeAlterada > 0) {
            itensCarrinho[i].quantidade = quantidadeAlterada
        } else {
            itensCarrinho[i].quantidade = 1
        }

        this.setState(prevState => ({
            dadosConsumo: {
                ...prevState.dadosConsumo,
                itens: itensCarrinho
            }
        }))

        this.recalculaTotal(i)            
    }

    recalculaTotal(i) {
        const itensCarrinho = this.state.dadosConsumo.itens;
        const quantidade = itensCarrinho[i].quantidade;
        const preco = itensCarrinho[i].produtoServico.preco;
        const subtotal = quantidade * preco;
        itensCarrinho[i].subtotal = subtotal

        const somaTotal = itensCarrinho.reduce((acumulador, item) => {
            return acumulador + item.subtotal;
        }, 0);

        this.setState(prevState => ({
            dadosConsumo: {
                ...prevState.dadosConsumo,
                total: somaTotal,
                itens: itensCarrinho
            }
        }))
    }

    excluirConsumo(i) {
        const itensCarrinho = this.state.dadosConsumo.itens

        itensCarrinho.splice(i, 1)

        this.setState(prevState => ({
            dadosConsumo: {
                ...prevState.dadosConsumo,
                itens: itensCarrinho
            }
        }))
    }

    renderCamposPesquisa() {
        let estiloTitulo = `center-align blue-text`
        let titulo = `${this.props.titulo}`
        let estiloBotaoAdd = `btn waves-effect waves-light`

        return (
            <>
                <h5 className={estiloTitulo} style={{marginBottom: "30px"}}>{titulo}</h5>
                <div className="row">
                    <div className="col s12 xl5">
                        <Autocomplete
                            disablePortal
                            id="combo-box-clientes"
                            options={this.state.clientesSelect}
                            style={{ width: "100%", marginBottom: "10px" }}
                            value={this.state.dadosConsumo.cliente.nome || ''}
                            onChange={this.handleClienteSelected}
                            disabled={this.state.isCamposDesabilitados}
                            renderInput={(params) => <TextField {...params} label="Insira o cliente..." />}
                        />
                    </div>

                    <div className="col s9 xl6">
                        <Autocomplete
                            disablePortal
                            id="combo-box-itens"
                            options={this.state.itensSelect}
                            style={{ width: "100%" }}
                            onChange={this.handleProdutoServicoSelected}
                            disabled={this.state.isCamposDesabilitados}
                            renderInput={(params) => <TextField {...params} label="Insira um item..." />}
                        />
                    </div>

                    <div className="col s2 xl1">
                        <button className={estiloBotaoAdd} style={{ marginTop: "15px" }} type="submit" name="action" onClick={this.handleAddItem} disabled={this.state.isCamposDesabilitados}>Add
                            <i className="material-icons right">add_shopping_cart</i>
                        </button>
                    </div>
                </div>
            </>
        )
    }

    renderRodape() {
        let estiloBotaoSalvar = `btn waves-effect waves-light ${this.props.tema}`
        let estiloBotaoSair = `btn waves-effect waves-light red`

        let botaoRodape

        if (this.props.titulo === 'Visualização da Compra') {
            botaoRodape =
                <>
                    <button onClick={(e) => this.props.seletorView('Consumos', e)} className={estiloBotaoSair} type="button">Leave
                        <i className="material-icons right">arrow_back</i>
                    </button>
                </>
        } else {
            botaoRodape =
                <>
                    <button onClick={() => this.showToast('Compra salva com sucesso!')} className={estiloBotaoSalvar} type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </>
        }

        return (
            <>
                <div className="row">
                    <div className="col s6 offset-s6 right-align">
                        <span className="flow-text">Total: {this.formatarValor(this.state.dadosConsumo.total)}</span>
                    </div>
                    <div className="col s12">
                        {botaoRodape}
                    </div>
                </div>

            </>
        )
    }

    render() {
        let estiloBotaoExcluir = `btn-floating btn-small waves-effect waves-light btn tooltipped red`
        let quantidadeItensCarrinho = this.state.dadosConsumo.itens.length
        let camposPesquisa = this.renderCamposPesquisa()
        let rodape = this.renderRodape()

        if (quantidadeItensCarrinho > 0) {
            const listaItens = this.state.dadosConsumo.itens.map((item, i) => (
                <tr key={i}>
                    <td>{item.produtoServico.id}</td>
                    <td>{item.produtoServico.nome}</td>
                    <td>
                        {this.formatarValor(item.produtoServico.preco)}
                    </td>
                    <td>
                        <input type="number" style={{ width: "100px"}} value={item.quantidade} onChange={(e) => this.capturarQtd(e, i)} disabled={this.state.isCamposDesabilitados}/>
                    </td>
                    <td>
                        {this.formatarValor(item.subtotal)}
                    </td>
                    <td>
                        <button className={estiloBotaoExcluir} onClick={(e) => this.excluirConsumo(i)} data-position="left" data-tooltip="Excluir" disabled={this.state.isCamposDesabilitados}>
                            <i className="material-icons">remove_shopping_cart</i>
                        </button>
                    </td>
                </tr>
            ))
            return (
                <>
                    {camposPesquisa}
                    <div className="row">
                        <form className="col s12" onSubmit={(e) => this.submeterFormulario(e)}>
                            <div className="row">
                                <table className="highlight centered responsive-table">
                                    <thead>
                                        <tr>
                                            <th>ID do Item</th>
                                            <th>Descrição</th>
                                            <th>Preço Unit.</th>
                                            <th>Quantidade</th>
                                            <th>Subtotal</th>
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {listaItens}
                                    </tbody>
                                </table>
                            </div>
                            {rodape}
                        </form>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    {camposPesquisa}
                </>
            )
        }
    }

    showToast(mensagem: string) {
        M.toast({ html: mensagem })
    }

}