export class clientesDadosAlta // Creo la clase
{
    private idCliente: number;
    private nombreCliente: string;
    private _selected: boolean;
    constructor(values: any) {
            this.idCliente = values['idCliente'] || 0;
            this.nombreCliente = values['nombreCliente'] || '';
            if (this._selected === undefined) {this._selected = false};
        }
        get getIdCliente(): number {
            return this.idCliente;
        }
        set setIdCliente(valor: number) {
            this.idCliente = valor;
        }

        get getNombreCliente(): string {
            return this.nombreCliente;
        }
        set setNombreCliente(valor: string) {
            this.nombreCliente = valor;
        }
        get selected(): boolean {
            return this._selected;
        }
        set selected(value: boolean) {
            this._selected = value;
        }

}