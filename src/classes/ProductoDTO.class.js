
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