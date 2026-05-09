script.js
const form = document.getElementById("os-form");
const ordersList = document.getElementById("orders-list");
const searchInput = document.getElementById("search");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveOrders() {
  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );
}

function updateDashboard() {

  document.getElementById("total-os").innerText =
    orders.length;

  document.getElementById("open-os").innerText =
    orders.filter(
      order => order.status === "Aberto"
    ).length;

  document.getElementById("progress-os").innerText =
    orders.filter(
      order => order.status === "Em andamento"
    ).length;

  document.getElementById("done-os").innerText =
    orders.filter(
      order => order.status === "Finalizado"
    ).length;
}

function renderOrders(filter = "") {

  ordersList.innerHTML = "";

  const filteredOrders = orders.filter(order =>
    order.cliente.toLowerCase().includes(filter.toLowerCase()) ||
    order.equipamento.toLowerCase().includes(filter.toLowerCase())
  );

  filteredOrders.forEach(order => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${order.id}</td>
      <td>${order.cliente}</td>
      <td>${order.equipamento}</td>
      <td>${order.problema}</td>
      <td>${order.tecnico}</td>
      <td>${order.status}</td>

      <td>

        <button
          class="action-btn edit"
          onclick="editOrder(${order.id})"
        >
          Editar
        </button>

        <button
          class="action-btn delete"
          onclick="deleteOrder(${order.id})"
        >
          Excluir
        </button>

      </td>
    `;

    ordersList.appendChild(tr);
  });

  updateDashboard();
}

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const order = {
    id: Date.now(),
    cliente: document.getElementById("cliente").value,
    equipamento: document.getElementById("equipamento").value,
    problema: document.getElementById("problema").value,
    tecnico: document.getElementById("tecnico").value,
    status: document.getElementById("status").value
  };

  orders.push(order);

  saveOrders();
  renderOrders();

  form.reset();
});

function deleteOrder(id) {

  orders = orders.filter(order => order.id !== id);

  saveOrders();
  renderOrders();
}

function editOrder(id) {

  const order = orders.find(
    order => order.id === id
  );

  const cliente = prompt(
    "Editar cliente:",
    order.cliente
  );

  const equipamento = prompt(
    "Editar equipamento:",
    order.equipamento
  );

  const problema = prompt(
    "Editar problema:",
    order.problema
  );

  const tecnico = prompt(
    "Editar técnico:",
    order.tecnico
  );

  const status = prompt(
    "Editar status:",
    order.status
  );

  order.cliente = cliente;
  order.equipamento = equipamento;
  order.problema = problema;
  order.tecnico = tecnico;
  order.status = status;

  saveOrders();
  renderOrders();
}

searchInput.addEventListener("input", (e) => {
  renderOrders(e.target.value);
});

renderOrders();
