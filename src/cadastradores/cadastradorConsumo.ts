import { URI } from "../enuns/uri";
import Cadastrador from "./cadastrador";

class CadastradorConsumo implements Cadastrador {
    cadastrar(objeto: Object): void {
        fetch(URI.CADASTRAR_CONSUMO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
        })
    }

}
export default CadastradorConsumo