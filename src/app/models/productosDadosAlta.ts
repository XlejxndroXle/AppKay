export class productosDadosAlta // Creo la clase
{
    private idProductos: number;
    private nombreProducto: string;
    private _selected: boolean;
    constructor(values: any) {
            this.idProductos = values['idProductos'] || 0;
            this.nombreProducto = values['nombreProducto'] || '';
            if (this._selected === undefined) {this._selected = false};
        }
        get getIdProductos(): number {
            return this.idProductos;
        }
        set setIdProductos(valor: number) {
            this.idProductos = valor;
        }

        get getNombreProductos(): string {
            return this.nombreProducto;
        }
        set setNombreProductos(valor: string) {
            this.nombreProducto = valor;
        }
        get selected(): boolean {
            return this._selected;
        }
        set selected(value: boolean) {
            this._selected = value;
        }

}