const socket = io();

socket.on('productos', (data) => {
    renderProductos(data);
});

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById('contenedorProductos');
    contenedorProductos.innerHTML = ''; 

    productos.forEach(item => { 
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
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = parseInt(document.getElementById('id').value);
    const title = document.getElementById('title').value;
    const price = parseFloat(document.getElementById('price').value);

   
    if (!id || !title || !price) {
        console.log('ID, título y precio son obligatorios');
        return;
    }

    const nuevoProducto = { id, title, price };

    console.log('Nuevo producto:', nuevoProducto);  

    
    socket.emit('agregarProducto', nuevoProducto);

  
    form.reset();
});