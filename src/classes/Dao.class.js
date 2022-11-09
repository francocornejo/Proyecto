import {CustomError} from "./CustomError.class.js"
import ProductoDTO from "./ProductoDTO.class.js";

export default class DAO {
  async getAll() {
    throw new CustomError(500, "Falta implementar getAll en sub clase");
  }

  async getById(id) {
    try {
      // await this.db.connect();
      const producto = await this.collection.findOne({ _id: id }, { __V: 0 });
      return new ProductoDTO(producto);
    } catch (error) {
      throw new CustomError(500, error);
    }
  }

  async create() {
    throw new CustomError(500, "Falta implementar create en sub clase");
  }

  async update() {
    throw new CustomError(500, "Falta implementar update en sub clase");
  }

  async deleteById() {
    throw new CustomError(500, "Falta implementar deleteById en sub clase");
  }

}