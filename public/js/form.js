const socket = io();

socket.on("productTable", (data) => {
  loadProductTable(data);
});

const buttonForm = document.getElementById("buttonForm");

const insertToTable = document.getElementById("tableBody");

function loadProductTable(data) {
  const products = data;
  let html = "";
  products.reverse().forEach((element) => {
    html += `<tr>
          <th scope="row">${element.id}</th>
          <td>${element.title}</td>
          <td>${element.price}</td>
          <td class="text-center"><img
              width="30"
              src="${element.thumbnail}"
              alt="${element.title}"
            />
          </td>
        </tr>`;
  });
  insertToTable.innerHTML = html;
}

buttonForm.addEventListener("click", (e) => {
  e.preventDefault();

  const data = {
    title: document.querySelector('input[name="title"]').value,
    price: document.querySelector('input[name="price"]').value,
    thumbnail: document.querySelector('input[name="thumbnail"]').value,
  };

  fetch("/api/productos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(
        "#liveToast"
      ).innerHTML = `<div class="toast-header">
        <img
          style="height:25px"
          src="${data.thumbnail}"
          class="rounded me-2"
          alt="${data.title}"
        />
        <strong class="me-auto">Carga exitosa</strong>
        <small>justo ahora</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">
        ${data.title}
        agregado correctamente
      </div>`;
      // new bootstrap.Toast(document.getElementById("liveToast")).show();
      let newProduct = document.createElement("tr");
      newProduct.innerHTML = `
          <th scope="row">${data.id}</th>
          <td>${data.title}</td>
          <td>${data.price}</td>
          <td class="text-center"><img
              width="30"
              src="${data.thumbnail}"
              alt="${data.title}"
            />
          </td>
        `;
      insertToTable.prepend(newProduct);
    })
    .catch((error) => console.log(error));
});
