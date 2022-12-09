const ahorro = document.getElementById('ahorro')
const ingreso = document.getElementById('ingreso')
const gasto = document.getElementById('gasto')
const list = document.getElementById('list')
const form = document.getElementById('form')
const concepto = document.getElementById('concepto')
const cantidad = document.getElementById('cantidad')


const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transacs = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];



function addTransac(e) {
    e.preventDefault();

    if(concepto.value.trim() === '' || cantidad.value.trim() === '') {
        alert('Añada el concepto y la cantidad');
    }else {
        const transac = {
            id: randomID(),
            concepto: concepto.value,
            cantidad: +cantidad.value
        };

        transacs.push(transac);

        addTransacDOM(transac);

        updateValues()

        updateLocalStorage()

        concepto.value = ''
        cantidad.value = ''
    }
}


function randomID() {
    return Math.floor(Math.random() * 100000000);
}


function addTransacDOM(transac) {
    const sign = transac.cantidad < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transac.cantidad < 0 ? 'minus' : 'plus');

    item.innerHTML = `${transac.concepto} <span> ${sign}${Math.abs(transac.cantidad)} </span> 
    <button class="delete-button" onclick="removeTransaction(${transac.id})">x</button>`;

    list.appendChild(item);
}

function updateValues() {
    const cantidades = transacs.map(transac => transac.cantidad);

    const total = cantidades.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const ingr = cantidades
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const gas = (
        cantidades.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

   
    ahorro.innerText = `€${total}`;
    ingreso.innerText = `€${ingr}`;
    gasto.innerText = `€${gas}`;
}

function removeTransac(id) {
    transacs = transacs.filter(transac => transac.id !== id);

    updateLocalStorage();

    init();
}


function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transacs));
}

function init() {
    list.innerHTML = '';

    transacs.forEach(addTransacDOM);
    updateValues()
}

init();

form.addEventListener('submit', addTransac);