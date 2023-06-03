import { Component } from "react";

type props = {
    titulo: string,
    tema: string
}

export default class FormularioCadastroConsumo extends Component<props> {

    render() {
        let estiloTitulo = `center-align blue-text`
        let titulo = `${this.props.titulo}`
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`
        return (
            <>
                <h5 className={estiloTitulo}>{titulo}</h5>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="id" type="text" className="validate" />
                                <label htmlFor="id">ID da compra</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="data" type="text" className="validate" />
                                <label htmlFor="data">Data</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="total" type="text" className="validate" />
                                <label htmlFor="total">Valor Total (R$)</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="cpf" type="text" className="validate" />
                                <label htmlFor="cpf">CPF do Cliente</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button onClick={() => this.showToast()} className={estiloBotao} type="submit" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    showToast() {
        M.toast({ html: 'Apenas as transições de tela e o layout foram desenvolvidos!' })
    }

}