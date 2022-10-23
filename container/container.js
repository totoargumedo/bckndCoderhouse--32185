import fs from "fs";

class ContainerFile {
  #id = 0;
  #content = [];
  #fileName;

  constructor(fileName) {
    this.#fileName = `./data/${fileName}.txt`;
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.#fileName, "utf-8");
      this.#content = JSON.parse(data);
      if (this.#content.length > 0) {
        this.#id = Math.max(...this.#content.map((e) => e.id));
      }
      console.log({
        message: `El archivo ${this.#fileName} se cargo correctamente`,
      });
    } catch (error) {
      await this.write("[]");
      console.log({
        error: error,
        description: `Error al cargar ${this.#fileName}`,
        message: `Se creo ${this.#fileName}`,
      });
      // console.log({         |opcional si no se quiere crear al no existir|
      //   error: error,
      //   description: `Error al cargar ${this.#fileName}`,
      // });
    }
  }

  async write(data) {
    try {
      await fs.promises.writeFile(this.#fileName, JSON.stringify(data));
      console.log({
        message: `El archivo ${this.#fileName} se actualizo`,
      });
    } catch (error) {
      console.log({
        error: error,
        description: `Error al escribir ${this.#fileName}`,
      });
    }
  }

  async save(element) {
    this.#id++;
    let newElement = { ...element, id: this.#id };
    this.#content.push(newElement);
    await this.write(this.#content);
    console.log({
      message: `Elemento ${newElement.title} guardado correctamente`,
    });
  }

  getById(id) {
    let elementFind = this.#content.find((element) => element.id == id);
    if (!elementFind) {
      return { error: "Elemento no encontrado" };
    } else {
      return { message: "Elemento encontrado", element: elementFind };
    }
  }

  getAll() {
    if (this.#content.length == 0) {
      console.log({ error: "No existen elementos guardados" });
    } else {
      console.log(this.#content);
      return this.#content;
    }
  }

  async deleteById(id) {
    let index = this.#content.indexOf(
      this.#content.find((element) => element.id == id)
    );
    if (index == -1) {
      console.log({ error: `Error: elemento con id: ${id} no encontrado` });
    } else {
      this.#content.splice(index, 1);
      await this.write(this.#content);
      console.log({ message: `Elemento eliminado correctamente` });
    }
  }

  async deleteAll() {
    await this.write("[]");
    console.log("Todos los productos fueron borrados correctamente");
  }
}

export default ContainerFile;
