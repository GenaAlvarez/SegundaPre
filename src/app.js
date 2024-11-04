import express from 'express';
import productsRouter from './routes/product.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js';
import { Server} from 'socket.io';
import { engine } from 'express-handlebars';
import ProductManager from './controllers/product-manager.js';

const app = express();
const PUERTO = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


//Rutas 
app.use('/', viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const manager = new ProductManager();
const io = new Server()

io.on("connection", async (socket) => {
    console.log("Un cliente se conecto");

    //Le envian el array de productos a la vista realTimeProducts: 
    socket.emit("productos", await manager.getProducts());
    //Con un evento y el metodo "on" lo escuchas desde el  main.js y lo mostras por pantalla. 

    //Recibimos el evento "eliminarProducto" desde el cliente y borramos con el metodo borrar: 
    socket.on("eliminarProducto", async (id) => {
        await manager.deleteProduct(id); 

        //Despues de borrar le envio los productos actualizados al cliente: 
        io.sockets.emit("productos", await manager.getProducts());
    })
    
})

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})