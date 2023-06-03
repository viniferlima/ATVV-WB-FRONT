export class Consumo {
   public id: number
   public itemDescricao: string;
   public data: string
   public total: number
   public cpfDoCliente: string;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getItemDescricao(): string {
        return this.itemDescricao;
    }

    public setItemDescricao(itemDescricao: string): void {
        this.itemDescricao = itemDescricao;
    }

    public getData(): string {
        return this.data;
    }

    public setData(data: string): void {
        this.data = data;
    }

    public getTotal(): number {
        return this.total;
    }

    public setTotal(total: number): void {
        this.total = total;
    }

    public getCpfDoCliente(): string {
        return this.cpfDoCliente;
    }

    public setCpfDoCliente(cpfDoCliente: string): void {
        this.cpfDoCliente = cpfDoCliente;
    }

}