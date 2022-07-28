import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"; 

class ProductoDaoFirebase extends ContenedorFirebase {
    constructor(){
        super("productos")
    }

    async update(id, title, description, code, price, thumbnail, stock){
        const doc = this.collection.doc(id)
        await doc.update({title, description, code, price, thumbnail, stock})
                  
      }
      async newProduct(title, description, code, price, thumbnail, stock){
        const doc = this.collection.doc()
        await doc.create({title, description, code, price, thumbnail, stock,timestamp:Date.now()})         
      }
}

export default ProductoDaoFirebase;