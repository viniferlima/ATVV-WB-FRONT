import RemovedorLocal from "./removedorLocal";

export default class RemovedorConsumoLocal implements RemovedorLocal {
    public remover(objeto: Object[], id: string): Object[] {
        let consumos = objeto.filter(elemento => elemento['id'] !== id)
        return consumos
    }
}