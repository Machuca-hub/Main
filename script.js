// Productos de ejemplo
const productos = [
    {
        id: 1,
        nombre: "Camiseta Clásica",
        descripcion: "Camiseta de algodón de alta calidad disponible en varios colores.",
        precio: 19.99,
        imagen: "https://via.placeholder.com/300x200?text=Camiseta+Clásica",
        color: ["Rojo", "Azul", "Verde", "Negro"]
    },
    {
        id: 2,
        nombre: "Pantalones Chinos",
        descripcion: "Pantalones cómodos para cualquier ocasión, disponibles en múltiples tallas.",
        precio: 39.99,
        imagen: "https://via.placeholder.com/300x200?text=Pantalones+Chinos",
        color: ["Beige", "Gris", "Azul Marino", "Negro"]
    },
    {
        id: 3,
        nombre: "Zapatos Deportivos",
        descripcion: "Zapatos elegantes y duraderos, perfectos para el día a día.",
        precio: 59.99,
        imagen: "https://via.placeholder.com/300x200?text=Zapatos+Deportivos",
        color: ["Blanco", "Negro", "Gris", "Rojo"]
    },
    {
        id: 4,
        nombre: "Gorra Urbana",
        descripcion: "Gorra moderna para el día a día, ajustable para mayor comodidad.",
        precio: 14.99,
        imagen: "https://via.placeholder.com/300x200?text=Gorra+Urbana",
        color: ["Azul", "Negro", "Rojo", "Blanco"]
    },
    {
        id: 5,
        nombre: "Chaqueta de Cuero",
        descripcion: "Chaqueta de cuero genuino, ideal para lucir con estilo.",
        precio: 89.99,
        imagen: "https://via.placeholder.com/300x200?text=Chaqueta+de+Cuero",
        color: ["Negro", "Marrón"]
    },
    {
        id: 6,
        nombre: "Bufanda de Lana",
        descripcion: "Bufanda cálida y suave, perfecta para los días fríos.",
        precio: 24.99,
        imagen: "https://via.placeholder.com/300x200?text=Bufanda+de+Lana",
        color: ["Gris", "Azul", "Rojo", "Verde"]
    },
    {
        id: 7,
        nombre: "Reloj Clásico",
        descripcion: "Reloj de pulsera con diseño clásico y elegante.",
        precio: 49.99,
        imagen: "https://via.placeholder.com/300x200?text=Reloj+Clásico",
        color: ["Oro", "Plata", "Negro"]
    },
    {
        id: 8,
        nombre: "Bolso de Mano",
        descripcion: "Bolso de mano espacioso y elegante, perfecto para cualquier ocasión.",
        precio: 34.99,
        imagen: "https://via.placeholder.com/300x200?text=Bolso+de+Mano",
        color: ["Marrón", "Negro", "Rojo", "Azul"]
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

        // Generar opciones de color
        let coloresHTML = '';
        producto.color.forEach(color => {
            coloresHTML += `<span class="color">${color}</span> `;
        });

        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="colores"><strong>Colores:</strong> ${coloresHTML}</div>
            <div class="precio">€${producto.precio.toFixed(2)}</div>
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

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Función para incrementar la cantidad de un producto en el carrito
function incrementarCantidad(id) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad += 1;
        actualizarCarrito();
    }
}

// Función para decrementar la cantidad de un producto en el carrito
function decrementarCantidad(id) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        if (item.cantidad > 1) {
            item.cantidad -= 1;
        } else {
            eliminarDelCarrito(id);
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
            <p>${item.nombre}</p>
            <div class="cantidad">
                <button class="decrementar" data-id="${item.id}">-</button>
                <span>${item.cantidad}</span>
                <button class="incrementar" data-id="${item.id}">+</button>
            </div>
            <p>€${(item.precio * item.cantidad).toFixed(2)}</p>
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

// Manejar incremento y decremento en el carrito
listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('incrementar')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        incrementarCantidad(id);
    }

    if (e.target.classList.contains('decrementar')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        decrementarCantidad(id);
    }
});
