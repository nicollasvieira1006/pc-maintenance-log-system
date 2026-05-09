const form = document.getElementById("os-form");
const ordersList = document.getElementById("orders-list");
const searchInput = document.getElementById("search");

const STORAGE_KEY = "orders";

// 🔥 Carrega do localStorage com fallback seguro
let orders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// 💾 Salvar no localStorage
function saveOrders() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

// 📊 Atualiza dashboard
function updateDashboard() {

  const total = orders.length;
  const open = orders.filter(o => o.status === "Aberto").length;
  const progress = orders.filter(o => o.status === "Em andamento").length;
  const done = orders.filter(o => o.status === "Finalizado").length;

  document.getElementById("total-os").innerText = total;
  document.getElementById("open-os").innerText = open;
  document.getElementById("progress-os").innerText = progress;
  document.getElementById("done-os").innerText = done;
}

// 📄 Renderizar tabela
function renderOrders(filter = "") {

  ordersList.innerHTML = "";

  const f = filter.toLowerCase();

  const filteredOrders = orders.filter(order =>
    (order.cliente || "").toLowerCase().includes(f) ||
    (order.equipamento || "").toLowerCase().includes(f)
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
        <button class="action-btn edit" onclick="editOrder(${order.id})">Editar</button>
        <button class="action-btn delete" onclick="deleteOrder(${order.id})">Excluir</button>
      </td>
    `;

    ordersList.appendChild(tr);
  });

  updateDashboard();
}

// ➕ Criar ordem
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const order = {
    id: Date.now(),
    cliente: document.getElementById("cliente").value.trim(),
    equipamento: document.getElementById("equipamento").value.trim(),
    problema: document.getElementById("problema").value.trim(),
    tecnico: document.getElementById("tecnico").value.trim(),
    status: document.getElementById("status").value
  };

  orders.push(order);

  saveOrders();
  renderOrders();

  form.reset();
});

// ❌ Deletar ordem
function deleteOrder(id) {
  orders = orders.filter(order => order.id !== id);
  saveOrders();
  renderOrders();
}

// ✏️ Editar ordem (com proteção contra cancelamento)
function editOrder(id) {

  const order = orders.find(o => o.id === id);

  if (!order) return;

  const cliente = prompt("Editar cliente:", order.cliente);
  if (cliente === null) return;

  const equipamento = prompt("Editar equipamento:", order.equipamento);
  if (equipamento === null) return;

  const problema = prompt("Editar problema:", order.problema);
  if (problema === null) return;

  const tecnico = prompt("Editar técnico:", order.tecnico);
  if (tecnico === null) return;

  const status = prompt("Editar status:", order.status);
  if (status === null) return;

  order.cliente = cliente;
  order.equipamento = equipamento;
  order.problema = problema;
  order.tecnico = tecnico;
  order.status = status;

  saveOrders();
  renderOrders();
}

// 🔎 Busca
searchInput.addEventListener("input", (e) => {
  renderOrders(e.target.value);
});

// 🚀 Inicialização segura
window.onload = () => {
  renderOrders();
};
