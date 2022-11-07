import fs from "fs";
import crypto from "crypto";

class ContainerFile {
  #content = [];
  #fileName;

  constructor(fileName) {
    this.#fileName = `./file/${fileName}.txt`;
    this.read();
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.#fileName, "utf-8");
      this.#content = JSON.parse(data);
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
    const newElement = { ...element, id: crypto.randomUUID() };
    this.#content.push(newElement);
    await this.write(this.#content);
    return newElement;
  }

  getById(id) {
    const elementFind = this.#content.find((element) => element.id == id);
    if (!elementFind) {
      return { error: `Elemento ${id} no encontrado` };
    } else {
      return elementFind;
    }
  }

  async modifyById(id, element) {
    console.log(id + " " + element);
    let index = this.#content.indexOf(
      this.#content.find((element) => element.id == id)
    );
    if (index == -1) {
      return { error: `Error: elemento ${id} no encontrado` };
    } else {
      this.#content[index] = element;
      await this.write(this.#content);
      return this.#content[index];
    }
  }

  getAll() {
    if (this.#content.length == 0) {
      return { message: "No existen elementos guardados" };
    } else {
      return this.#content;
    }
  }

  getRandom() {
    if (this.#content.length == 0) {
      return { message: "No existen elementos guardados" };
    } else {
      return this.#content[Math.floor(Math.random() * this.#content.length)];
    }
  }

  async deleteById(id) {
    let index = this.#content.indexOf(
      this.#content.find((element) => element.id == id)
    );
    if (index == -1) {
      return { error: `Error: elemento ${id} no encontrado` };
    } else {
      const elementToDel = this.#content[index];
      this.#content.splice(index, 1);
      await this.write(this.#content);
      return elementToDel;
    }
  }

  async deleteAll() {
    await this.write("[]");
    return { message: "Todos los elementos fueron borrados correctamente" };
  }
}

export default ContainerFile;
