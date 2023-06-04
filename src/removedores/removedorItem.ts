import { URI } from "../enuns/uri";
import RemovedorRemoto from "./removedorRemoto";

export default class RemovedorItem implements RemovedorRemoto {
    public remover(objeto: Object): void {
        let json = { id: objeto['id'] }
        fetch(URI.DELETAR_ITEM, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
    }
}