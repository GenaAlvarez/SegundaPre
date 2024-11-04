import express from 'express';
import CartManager from '../controllers/cart-manager.js';
const router = express.Router()
const cartManger = new CartManager()

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManger.crearCarrito(); 
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


//2) Listamos los productos de determinado carrito: 

router.get("/:cid", async (req, res) => {
    let carritoId = req.params.cid;

    try {
        const carrito = await cartManger.getCarritoById(carritoId); 
        res.json(carrito.products); 
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito, rata de dos patas!"); 
    }
})


//3) Agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    let carritoId = req.params.cid;
    let productoId = req.params.pid; 
    let quantity = req.body.quantity || 1; 

    try {
        const actualizado = await cartManger.agregarProductosAlCarrito(carritoId, productoId, quantity); 
        res.json(actualizado.products); 
    } catch (error) {
        res.status(500).send("Error al agregar un producto, moriremos");
    }
})

export default router;