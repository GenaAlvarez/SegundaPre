const socket = io();

socket.on('productos', (data) => {
    renderProductos(data);
});

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById('contenedorProductos');
    contenedorProductos.innerHTML = '';  // Limpia el contenedor de productos

    productos.forEach(item => { // Cambié `productos.array` a `productos`
        const card = document.createElement('div');
        card.innerHTML = `
            <p> ID: ${item.id} </p>
            <p> Título: ${item.title} </p>
            <p> Precio: ${item.price} </p>
            <button> Eliminar </button>
        `;
        contenedorProductos.appendChild(card);

        card.querySelector('button').addEventListener('click', () => {
            eliminarProducto(item.id);
        });
    });
};

const eliminarProducto = (id) => {
    socket.emit('eliminarProducto', id);
};