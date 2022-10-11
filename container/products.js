class Product {
  #id = 0;
  #products = [];

  save(product) {
    this.#id++;
    let newProduct = { ...product, id: this.#id };
    this.#products.push(newProduct);
    console.log(`Producto ${newProduct.title} guardado correctamente`);
  }

  getById(id) {
    let productFind = this.#products.find((product) => product.id == id);
    if (!productFind) {
      return { error: "Producto no encontrado" };
    } else {
      return { message: "Producto encontrado", producto: productFind };
    }
  }

  getAll() {
    if (this.#products.length == 0) {
      return { error: "No existen productos" };
    } else {
      return this.#products;
    }
  }

  deleteById(id) {
    let index = this.#products.indexOf(
      this.#products.find((product) => product.id == id)
    );
    if (index == -1) {
      console.log(`Error: producto con id: ${id} no encontrado`);
    } else {
      this.#products.splice(index, 1);
      console.log(`Producto eliminado correctamente`);
    }
  }

  deleteAll() {
    this.#products = [];
    console.log("Todos los productos fueron borrados correctamente");
  }
}

export default Product;
