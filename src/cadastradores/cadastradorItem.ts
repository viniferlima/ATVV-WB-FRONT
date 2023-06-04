import { URI } from "../enuns/uri";
import Cadastrador from "./cadastrador";

class CadastradorItem implements Cadastrador {
    cadastrar(objeto: Object): void {
        fetch(URI.CADASTRAR_ITEM, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
        })
    }

}
export default CadastradorItem