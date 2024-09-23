// Productos de ejemplo
const productos = [
    {
        id: 1,
        nombre: "Camiseta",
        descripcion: "Camiseta de algodón de alta calidad.",
        precio: 19.99,
        imagen: "https://via.placeholder.com/250x150?text=Camiseta"
    },
    {
        id: 2,
        nombre: "Pantalones",
        descripcion: "Pantalones cómodos para cualquier ocasión.",
        precio: 39.99,
        imagen: "https://via.placeholder.com/250x150?text=Pantalones"
    },
    {
        id: 3,
        nombre: "Zapatos",
        descripcion: "Zapatos elegantes y duraderos.",
        precio: 59.99,
        imagen: "https://via.placeholder.com/250x150?text=Zapatos"
    },
    {
        id: 4,
        nombre: "Gorra",
        descripcion: "Gorra moderna para el día a día.",
        precio: 14.99,
        imagen: "https://via.placeholder.com/250x150?text=Gorra"
    }
];

// Carrito de compras
let carrito = [];

// Elementos del DOM
const productosDiv = document.getElementById('productos');
const botonCarrito = document.getElementById('boton-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const cerrarModal = document.querySelector('.cerrar');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const cantidadCarrito = document.getElementById('cantidad-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Función para mostrar los productos
function mostrarProductos() {
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="precio">$${producto.precio.toFixed(2)}</div>
            <button data-id="${producto.id}">Agregar al Carrito</button>
        `;

        productosDiv.appendChild(productoDiv);
    });
}

// Función para agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    if (producto) {
        const itemExistente = carrito.find(item => item.id === id);
        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({...producto, cantidad: 1});
        }
        actualizarCarrito();
    }
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    // Limpiar lista
    listaCarrito.innerHTML = '';

    let total = 0;
    let cantidad = 0;

    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrito');
        itemDiv.innerHTML = `
            <p>${item.nombre} x${item.cantidad}</p>
            <p>$${(item.precio * item.cantidad).toFixed(2)}</p>
        `;
        listaCarrito.appendChild(itemDiv);

        total += item.precio * item.cantidad;
        cantidad += item.cantidad;
    });

    totalCarrito.textContent = total.toFixed(2);
    cantidadCarrito.textContent = cantidad;
}

// Función para abrir el modal del carrito
function abrirCarrito() {
    modalCarrito.style.display = "block";
}

// Función para cerrar el modal del carrito
function cerrarCarrito() {
    modalCarrito.style.display = "none";
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', mostrarProductos);

productosDiv.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const id = parseInt(e.target.getAttribute('data-id'));
        agregarAlCarrito(id);
    }
});

botonCarrito.addEventListener('click', abrirCarrito);
cerrarModal.addEventListener('click', cerrarCarrito);

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (e) => {
    if (e.target == modalCarrito) {
        cerrarCarrito();
    }
});

vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
