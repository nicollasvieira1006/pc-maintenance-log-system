const form = document.getElementById('form');
const recordsTable = document.querySelector('#records tbody');

let records = JSON.parse(localStorage.getItem('records')) || [];

function displayRecords() {
    recordsTable.innerHTML = '';
    records.forEach((record, index) => {
        const row = document.createElement('tr');
        row.classList.add('record-enter');
        row.innerHTML = `
            <td>${record.computer}</td>
            <td>${record.service}</td>
            <td>${record.date}</td>
            <td>${record.status}</td>
            <td>
                <button onclick="deleteRecord(${index}, this)">Excluir</button>
            </td>
        `;
        recordsTable.appendChild(row);

        // Animação de entrada
        requestAnimationFrame(() => {
            row.classList.add('record-enter-active');
        });

        // Destaque do novo registro
        setTimeout(() => row.classList.add('highlight'), 500);
        setTimeout(() => row.classList.remove('highlight'), 1500);
    });
}

function deleteRecord(index, btn) {
    const row = btn.parentElement.parentElement;
    row.classList.add('record-exit');
    requestAnimationFrame(() => row.classList.add('record-exit-active'));

    setTimeout(() => {
        records.splice(index, 1);
        localStorage.setItem('records', JSON.stringify(records));
        displayRecords();
    }, 500);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newRecord = {
        computer: document.getElementById('computer').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        status: document.getElementById('status').value
    };
    records.push(newRecord);
    localStorage.setItem('records', JSON.stringify(records));
    form.reset();
    displayRecords();
});

displayRecords();
