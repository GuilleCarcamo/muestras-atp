// scripts.js

let productos = []; // Variable global para almacenar los productos

// Función para cargar los datos del JSON
async function loadCards() {
    try {
        // Cargar el archivo JSON
        const response = await fetch('data.json');
        productos = await response.json();
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Función para renderizar las tarjetas
function renderCards(productosFiltrados) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Limpiar el contenedor

    if (productosFiltrados.length === 0) {
        // Mostrar un mensaje si no hay coincidencias
        cardContainer.innerHTML = '<p class="text-center">No se encontraron productos.</p>';
    } else {
        // Renderizar las tarjetas filtradas
        productosFiltrados.forEach(producto => {
            const card = `
                <div class="col-md-4 mb-4 card-item">
                    <div class="card" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Modelo:</strong> ${producto.modelo}</li>
                            <li class="list-group-item"><strong>Número:</strong> ${producto.numero}</li>
                            <li class="list-group-item"><strong>Ubicación:</strong> ${producto.ubicacion}</li>
                            <li class="list-group-item"><strong>Medios:</strong> ${producto.medios}</li>
                        </ul>
                    </div>
                </div>
            `;
            cardContainer.innerHTML += card; // Agregar la tarjeta al contenedor
        });
    }
}

// Función para filtrar tarjetas según el texto de búsqueda
function filterCards() {
    const searchText = document.getElementById('searchInput').value.toLowerCase(); // Obtener el texto de búsqueda
    if (searchText === '') {
        // Si el campo de búsqueda está vacío, no mostrar nada
        document.getElementById('cardContainer').innerHTML = '';
    } else {
        // Filtrar productos
        const productosFiltrados = productos.filter(producto => {
            const nombre = producto.nombre.toLowerCase();
            const numero = producto.numero.toLowerCase();
            const modelo = producto.modelo.toLowerCase();
            const medios = producto.medios.toLowerCase();
            const ubicacion = producto.ubicacion.toLowerCase();
            return (
                nombre.includes(searchText) ||
                numero.includes(searchText) ||
                modelo.includes(searchText) ||
                medios.includes(searchText) ||
                ubicacion.includes(searchText)
            ); // Filtrar por nombre, número, modelo, medios o ubicación
        });
        renderCards(productosFiltrados); // Renderizar solo las tarjetas filtradas
    }
}

// Función para mostrar todas las tarjetas
function showAllCards() {
    renderCards(productos); // Renderizar todas las tarjetas
}

// Evento de búsqueda
document.getElementById('searchInput').addEventListener('input', filterCards);

// Eventos del menú de navegación
document.getElementById('inicioLink').addEventListener('click', () => {
    document.getElementById('cardContainer').innerHTML = ''; // Limpiar el contenedor
});

document.getElementById('muestrasLink').addEventListener('click', showAllCards);

// Llamar a la función para cargar los datos cuando la página se cargue
window.onload = loadCards;