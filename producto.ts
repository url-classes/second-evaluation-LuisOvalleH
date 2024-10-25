export class Product {
    private nombre : string;
    private codigo :  number;
    private precio: number;
    constructor (nombre:string, codigo: number, precio:number){
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio
    }

    public getNombre(){
        return this.nombre;
    }

    public getCodigo(){
        return this.codigo;
    }

    public getPrecio(){
        return this.precio;
    }

    public getAllDatas(){
        return " Producto: " + this.nombre + " Codigo: " + this.codigo + " precio: " + this.precio
    }
}
