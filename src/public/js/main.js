const socket = io();

socket.on('productos', (data) => {
    renderProductos(data);
});

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById('contenedorProductos');
    contenedorProductos.innerHTML = ''; 

    productos.forEach(item => { 
        const card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `
            <p> ID: ${item.id} </p>
            <p> Título: ${item.title} </p>
            <p> Descripcion: ${item.description} </p>
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

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const code = document.getElementById('code').value;
    const stock = parseInt(document.getElementById('stock').value);
    const category = document.getElementById('category').value;

    
    if (!title || !description || !price || !code || !stock || !category) {
        console.log('Todos los campos son obligatorios');
        return;
    }

    const nuevoProducto = { title, description, price, code, stock, category };

    console.log('Nuevo producto:', nuevoProducto);  

   
    socket.emit('agregarProducto', nuevoProducto);

    
    form.reset();
});