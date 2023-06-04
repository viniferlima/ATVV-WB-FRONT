import { URI } from "../enuns/uri";
import RemovedorRemoto from "./removedorRemoto";

export default class RemovedorConsumo implements RemovedorRemoto {
    public remover(objeto: Object): void {
        let json = { id: objeto['id'] }
        fetch(URI.DELETAR_CONSUMO, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
    }
}