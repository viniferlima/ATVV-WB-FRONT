import { URI } from "../enuns/uri"
import Atualizador from "./atualizador"

class AtualizadorItem implements Atualizador {
    atualizar(objeto: Object): void {
        fetch(URI.ATUALIZAR_ITEM, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
        })
    }

    adicionarQtdConsumida(consumo: any): void {
        fetch(URI.ITEM_ADICIONAR_QTD_CONSUMIDA, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consumo)
        })
    }

    subtrairQtdConsumida(consumo: any): void {
        fetch(URI.ITEM_SUBTRAIR_QTD_CONSUMIDA, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consumo)
        })
    }
}
export default AtualizadorItem