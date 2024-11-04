import express from 'express';
import { engine } from 'express-handlebars';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import ProductManager from './controllers/product-manager.js';

const app = express();
const PUERTO = 8080;

// Asegúrate de pasar la ruta correcta al constructor de ProductManager
const manager = new ProductManager('./src/models/productos.json');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));  // Cambiamos el directorio estático a `public` completo

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
});

const io = new Server(httpServer);

io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    
    socket.emit('productos', await manager.getProducts());

    
    socket.on('eliminarProducto', async (id) => {
        await manager.deleteProduct(id);
        io.sockets.emit('productos', await manager.getProducts());
    });
});