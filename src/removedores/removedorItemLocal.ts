import RemovedorLocal from "./removedorLocal";

export default class RemovedorItemLocal implements RemovedorLocal {
    public remover(objeto: Object[], id: string): Object[] {
        let itens = objeto.filter(elemento => elemento['id'] !== id)
        return itens
    }
}