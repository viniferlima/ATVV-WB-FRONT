import { Component } from "react";
import CadastradorCliente from "../cadastradores/cadastradorCliente";
import AtualizadorCliente from "../atualizador/atualizadorCliente";

type props = {
    titulo: string,
    tema: string,
    seletorView: Function,
    dadosClienteAtualizacao: any
}

type state = {
    dadosCliente: any
}

export default class FormularioCadastroCliente extends Component<props, state> {
    constructor(props) {
        super(props)
        this.capturarNome = this.capturarNome.bind(this)
        this.capturarSobrenome = this.capturarSobrenome.bind(this)
        this.capturarEmail = this.capturarEmail.bind(this)
        this.capturarTelefone = this.capturarTelefone.bind(this)
        this.capturarDDD = this.capturarDDD.bind(this)
        this.capturarEstado = this.capturarEstado.bind(this)
        this.capturarCidade = this.capturarCidade.bind(this)
        this.capturarBairro = this.capturarBairro.bind(this)
        this.capturarRua = this.capturarRua.bind(this)
        this.capturarNumero = this.capturarNumero.bind(this)
        this.capturarCodigoPostal = this.capturarCodigoPostal.bind(this)
        this.capturarInformacoesAdicionais = this.capturarInformacoesAdicionais.bind(this)
        this.cadastrarCliente = this.cadastrarCliente.bind(this)
        this.submeterFormulario = this.submeterFormulario.bind(this)
    }

    componentDidMount(): void {
        M.AutoInit();
    }

    componentWillMount(): void {
        if (this.props.titulo == 'Alteração de Cliente') {
            this.setState({
                dadosCliente: this.props.dadosClienteAtualizacao
            });
        } else {
            this.setState({
                dadosCliente: {
                    id: '',
                    nome: '',
                    sobreNome: '',
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
                }
            });
        }
    }

    public capturarNome(evento: any) {
        const nome = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                nome: nome
            }
        }));
    }

    public capturarSobrenome(evento: any) {
        const sobrenome = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                sobreNome: sobrenome
            }
        }));
    }

    public capturarTelefone(evento: any) {
        const telefone = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                telefone: {
                    ...prevState.dadosCliente.telefone,
                    numero: telefone
                }
            }
        }));
    }

    public capturarDDD(evento: any) {
        const ddd = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                telefone: {
                    ...prevState.dadosCliente.telefone,
                    ddd: ddd
                }
            }
        }));
    }

    public capturarEmail(evento: any) {
        const email = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                email: email
            }
        }));
    }

    public capturarEstado(evento: any) {
        const estado = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                endereco: {
                    ...prevState.dadosCliente.endereco,
                    estado: estado
                }
            }
        }));
    }

    public capturarCidade(evento: any) {
        const cidade = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                endereco: {
                    ...prevState.dadosCliente.endereco,
                    cidade: cidade
                }
            }
        }));
    }

    public capturarBairro(evento: any) {
        const bairro = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                endereco: {
                    ...prevState.dadosCliente.endereco,
                    bairro: bairro
                }
            }
        }));
    }

    public capturarRua(evento: any) {
        const rua = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                endereco: {
                    ...prevState.dadosCliente.endereco,
                    rua: rua
                }
            }
        }));
    }

    public capturarNumero(evento: any) {
        const numero = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                endereco: {
                    ...prevState.dadosCliente.endereco,
                    numero: numero
                }
            }
        }));
    }

    public capturarCodigoPostal(evento: any) {
        const codigoPostal = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                endereco: {
                    ...prevState.dadosCliente.endereco,
                    codigoPostal: codigoPostal
                }
            }
        }));
    }

    public capturarInformacoesAdicionais(evento: any) {
        const informacoesAdicionais = evento.target.value

        this.setState(prevState => ({
            dadosCliente: {
                ...prevState.dadosCliente,
                endereco: {
                    ...prevState.dadosCliente.endereco,
                    informacoesAdicionais: informacoesAdicionais
                }
            }
        }));
    }

    public cadastrarCliente(objeto: Object) {
        let cadastrador = new CadastradorCliente()
        cadastrador.cadastrar(objeto)
    }

    public atualizarCliente(objeto: Object) {
        let atualizador = new AtualizadorCliente()
        atualizador.atualizar(objeto)
    }

    public submeterFormulario(evento: any) {
        evento.preventDefault()

        let cliente = {
            id: null,
            nome: this.state.dadosCliente.nome,
            sobreNome: this.state.dadosCliente.sobreNome,
            email: this.state.dadosCliente.email,
            telefone: {
                ddd: this.state.dadosCliente?.telefone?.ddd,
                numero: this.state.dadosCliente?.telefone?.telefone
            },
            endereco: {
                estado: this.state.dadosCliente?.endereco?.estado,
                cidade: this.state.dadosCliente?.endereco?.cidade,
                bairro: this.state.dadosCliente?.endereco?.bairro,
                rua: this.state.dadosCliente?.endereco?.rua,
                numero: this.state.dadosCliente?.endereco?.numero,
                codigoPostal: this.state.dadosCliente?.endereco?.codigoPostal,
                informacoesAdicionais: this.state.dadosCliente?.endereco?.informacoesAdicionais
            }
        };

        if (this.props.titulo == 'Cadastro de Cliente') {
            this.efetuaCadastro(cliente)
        } else {
            cliente.id = this.state.dadosCliente.id
            this.efetuaAtualizacao(cliente)
        }
        this.props.seletorView('Clientes', evento)
        evento.target.reset()
    }

    efetuaCadastro(cliente: any) {
        console.log(cliente);
        this.cadastrarCliente(cliente);
        this.showToast('Cadastrado com sucesso!');
    }

    efetuaAtualizacao(cliente: any) {
        console.log(cliente);
        this.atualizarCliente(cliente);
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
                            <div className="input-field col s6 xl6">
                                <input id="nome" type="text" className="validate" value={this.state.dadosCliente.nome || ''} onChange={(e) => this.capturarNome(e)} />
                                <label className="active" htmlFor="nome">Nome</label>
                            </div>
                            <div className="input-field col s6 xl6">
                                <input id="sobrenome" type="text" className="validate" value={this.state.dadosCliente.sobreNome || ''} onChange={(e) => this.capturarSobrenome(e)} />
                                <label className="active" htmlFor="sobrenome">Sobrenome</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2 xl1">
                                <input id="ddd" type="text" className="validate" value={this.state.dadosCliente?.telefone?.ddd || ''} onChange={(e) => this.capturarDDD(e)} />
                                <label className="active" htmlFor="ddd">DDD</label>
                            </div>
                            <div className="input-field col s10 xl5">
                                <input id="telefone" type="text" className="validate" value={this.state.dadosCliente?.telefone?.numero || ''} onChange={(e) => this.capturarTelefone(e)} />
                                <label className="active" htmlFor="telefone">Telefone</label>
                            </div>
                            <div className="input-field col s12 xl6">
                                <input id="email" type="email" className="validate" value={this.state.dadosCliente?.email || ''} onChange={(e) => this.capturarEmail(e)} />
                                <label className="active" htmlFor="email">E-mail</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2 xl1">
                                <input id="numero" type="text" className="validate" value={this.state.dadosCliente?.endereco?.numero || ''} onChange={(e) => this.capturarNumero(e)} />
                                <label className="active" htmlFor="numero">Número</label>
                            </div>
                            <div className="input-field col s10 xl5">
                                <input id="bairro" type="text" className="validate" value={this.state.dadosCliente?.endereco?.bairro || ''} onChange={(e) => this.capturarBairro(e)} />
                                <label className="active" htmlFor="bairro">Bairro</label>
                            </div>
                            <div className="input-field col s12 xl6">
                                <input id="rua" type="text" className="validate" value={this.state.dadosCliente?.endereco?.rua || ''} onChange={(e) => this.capturarRua(e)} />
                                <label className="active" htmlFor="rua">Rua</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6 xl6">
                                <input id="cidade" type="text" className="validate" value={this.state.dadosCliente?.endereco?.cidade || ''} onChange={(e) => this.capturarCidade(e)} />
                                <label className="active" htmlFor="cidade">Cidade</label>
                            </div>
                            <div className="input-field col s6 xl6">
                                <select defaultValue="SP" id="estado" className="validate" value={this.state.dadosCliente?.endereco?.estado || ''} onChange={(e) => this.capturarEstado(e)}>
                                    <option value="Acre">Acre</option>
                                    <option value="Alagoas">Alagoas</option>
                                    <option value="Amapá">Amapá</option>
                                    <option value="Amazonas">Amazonas</option>
                                    <option value="Bahia">Bahia</option>
                                    <option value="Ceará">Ceará</option>
                                    <option value="Distrito Federal">Distrito Federal</option>
                                    <option value="Espirito Santo">Espírito Santo</option>
                                    <option value="Goiás">Goiás</option>
                                    <option value="Maranhão">Maranhão</option>
                                    <option value="Mato Grosso">Mato Grosso</option>
                                    <option value="Mato Grosso do Sul ">Mato Grosso do Sul</option>
                                    <option value="Minas Gerais">Minas Gerais</option>
                                    <option value="Pará">Pará</option>
                                    <option value="Paraíba">Paraíba</option>
                                    <option value="Paraná">Paraná</option>
                                    <option value="Pernambuco">Pernambuco</option>
                                    <option value="Piauí">Piauí</option>
                                    <option value="Rio de Janeiro">Rio de Janeiro</option>
                                    <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                                    <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                                    <option value="Rondônia">Rondônia</option>
                                    <option value="Roraima">Roraima</option>
                                    <option value="Santa Catarina">Santa Catarina</option>
                                    <option value="São Paulo">São Paulo</option>
                                    <option value="Sergipe">Sergipe</option>
                                    <option value="Tocantins">Tocantins</option>
                                    <option value="Estrangeiro">Estrangeiro</option>
                                </select>
                                <label className="active" htmlFor="estado">Estado</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6 xl6">
                                <input id="codigoPostal" type="text" className="validate" value={this.state.dadosCliente?.endereco?.codigoPostal || ''} onChange={(e) => this.capturarCodigoPostal(e)} />
                                <label className="active" htmlFor="codigoPostal">Código Postal</label>
                            </div>
                            <div className="input-field col s6 xl6">
                                <input id="informacoesAdicionais" type="text" className="validate" value={this.state.dadosCliente?.endereco?.informacoesAdicionais || ''} onChange={(e) => this.capturarInformacoesAdicionais(e)} />
                                <label className="active" htmlFor="informacoesAdicionais">Informações Adicionais</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className={estiloBotao} type="submit" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form >
                </div >
            </>
        )
    }

    showToast(mensagem: string) {
        M.toast({ html: mensagem })
    }
}