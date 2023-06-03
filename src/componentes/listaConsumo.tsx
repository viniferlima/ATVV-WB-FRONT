/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import { Consumo } from "../models/consumo";

type props = {
    titulo: string,
    tema: string,
    consumos: Consumo[],
    seletorView: Function
}

export default class ListaConsumo extends Component<props> {

    render() {
        let estiloTitulo = `center-align blue-text`
        let estiloBotaoNovo = `btn waves-effect waves-light ${this.props.tema}`
        let titulo = `${this.props.titulo}`
        return (
            <>
                <h5 className={estiloTitulo}>{titulo}</h5>

                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">search</i>
                        <input id="icon_prefix" type="text" className="validate" />
                        <label htmlFor="icon_prefix">Busca</label>
                    </div>
                </div>

                <table className="highlight centered responsive-table">
                    <thead>
                        <tr>
                            <th>Item Descrição</th>
                            <th>ID da Compra</th>
                            <th>Data</th>
                            <th>Valor total (R$)</th>
                            <th>CPF do Cliente</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.consumos.map((consumo, i) => (
                            <tr>
                                <td>{consumo.getItemDescricao()}</td>
                                <td>{consumo.getId()}</td>
                                <td>{consumo.getData()}</td>
                                <td>R${consumo.getTotal()}</td>
                                <td>{consumo.getCpfDoCliente()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={(e) => this.props.seletorView('Novo Consumo', e)} className={estiloBotaoNovo} style={{margin: "5px"}} type="submit" name="action">Novo
                    <i className="material-icons right">add</i>
                </button>
            </>
        )
    }
}