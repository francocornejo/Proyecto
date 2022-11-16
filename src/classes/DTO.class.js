
export default class ProductoDTO {
    constructor(data){
        this._id=data.id
        this.title= data.title
        this.description =data.description
        this.code = data.code
        this.price = data.price
        this.thumbnail =data.thumbnail
        this.timestamp = data.timestamp
        this.stock = data.stock
    }
}

export class CarritoDTO {
    constructor(data){
        this._id=data._id
        this.username= data.username
        this.address = data.address
        this.timestamp= data.timestamp
        this.productos =data.productos  ////quantity.....
    }
}

export class OrdenesDTO {
    constructor(data){
        this.orderNumber=data.orderNumber
        this.username= data.username
        this.address = data.address
        this.timestamp= data.timestamp
        this.status= data.status
        this.productos =data.productos 
    }
}