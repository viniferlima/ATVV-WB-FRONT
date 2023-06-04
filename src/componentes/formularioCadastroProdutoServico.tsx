import { Component } from "react";
import CadastradorItem from "../cadastradores/cadastradorItem";
import AtualizadorItem from "../atualizador/atualizadorItem";
import { NumericFormat } from 'react-number-format';

type props = {
    titulo: string,
    tema: string,
    seletorView: Function,
    dadosItemAtualizacao: any
}

type state = {
    dadosItem: any
}

export default class FormularioCadastroProdutoServico extends Component<props, state> {
    constructor(props) {
        super(props)
        this.capturarNome = this.capturarNome.bind(this)
        this.capturarPreco = this.capturarPreco.bind(this)
        this.capturarTipo = this.capturarTipo.bind(this)
        this.submeterFormulario = this.submeterFormulario.bind(this)
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentWillMount(): void {
        if (this.props.titulo == 'Alteração de Item') {
            this.setState({
                dadosItem: this.props.dadosItemAtualizacao
            });
        } else {
            this.setState({
                dadosItem: {
                    id: '',
                    nome: '',
                    preco: '',
                    tipo: 'Produto',
                }
            });
        }
    }

    public capturarNome(evento: any) {
        const nome = evento.target.value

        this.setState(prevState => ({
            dadosItem: {
                ...prevState.dadosItem,
                nome: nome
            }
        }));
    }

    public capturarPreco(evento: any) {
        const preco = evento.target.value.toString().trim()

        const apenasNumeros = preco.replace(/\D/g, "");

        this.setState(prevState => ({
            dadosItem: {
                ...prevState.dadosItem,
                preco: apenasNumeros
            }
        }));
    }

    public capturarTipo(evento: any) {
        const tipo = evento.target.value

        this.setState(prevState => ({
            dadosItem: {
                ...prevState.dadosItem,
                tipo: tipo
            }
        }));
    }

    public cadastrarItem(objeto: Object) {
        let cadastrador = new CadastradorItem()
        cadastrador.cadastrar(objeto)
    }

    public atualizarItem(objeto: Object) {
        let atualizador = new AtualizadorItem()
        atualizador.atualizar(objeto)
    }

    public submeterFormulario(evento: any) {
        evento.preventDefault()

        let item = {
            id: null,
            nome: this.state.dadosItem.nome,
            preco: this.state.dadosItem.preco,
            tipo: this.state.dadosItem.tipo,
            qtdConsumida: 0,
            qtdConsumidaGeneroMasculino: 0,
            qtdConsumidaGeneroFeminino: 0,
            qtdConsumidaGeneroOutro: 0
        };

        if (this.props.titulo == 'Cadastro de Item') {
            console.log('entrou aqui')
            this.efetuaCadastro(item)
        } else {
            item.id = this.state.dadosItem.id
            this.efetuaAtualizacao(item)
        }
        this.props.seletorView('Produtos/Serviços', evento)
        evento.target.reset()
    }

    efetuaCadastro(item: any) {
        console.log(item);
        this.cadastrarItem(item);
        this.showToast('Cadastrado com sucesso!');
    }

    efetuaAtualizacao(item: any) {
        console.log(item);
        this.atualizarItem(item);
        this.showToast('Atualizado com sucesso!');
    }

    render() {
        let estiloTitulo = `center-align blue-text`
        let titulo = `${this.props.titulo}`
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`
        return (
            <>
                <h5 className={estiloTitulo}>{titulo}</h5>
                <div className="row">
                    <form className="col s12" onSubmit={(e) => this.submeterFormulario(e)}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="first_name" type="text" className="validate" value={this.state.dadosItem.nome || ''} onChange={(e) => this.capturarNome(e)} />
                                <label className="active" htmlFor="first_name">Nome</label>
                            </div>
                            <div className="input-field col s6">
                                <NumericFormat className="validate" displayType="input" prefix="R$ " thousandSeparator="." decimalSeparator="," decimalScale={2} value={this.state.dadosItem.preco || ''} onChange={(e) => this.capturarPreco(e)} />
                                <label className="active" htmlFor="preco">Preço</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select defaultValue="Nenhum" value={this.state.dadosItem.tipo || ''} onChange={(e) => this.capturarTipo(e)}>
                                    <option value="Nenhum" disabled>Escolha o Tipo do item</option>
                                    <option value="Produto">Produto</option>
                                    <option value="Servico">Serviço</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className={estiloBotao} type="submit" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    showToast(mensagem: string) {
        M.toast({ html: mensagem })
    }
}