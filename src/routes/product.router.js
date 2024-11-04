import express from 'express'
import ProductManager from '../controllers/product-manager.js';

const router = express.Router();
const manager = new ProductManager('./src/models/productos.json')

router.get("/", async (req, res) => {
    const arrayProductos = await manager.getProducts(); 
    res.send(arrayProductos); 
})

//Buscar producto por id: 
router.get("/:pid", async (req, res) => {
    let id = req.params.pid; 
    try {
        const producto = await manager.getProductById(id); 

        if(!producto) {
            res.send("Producto no encontrado"); 
        } else {
            res.send(producto); 
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos"); 
    }
})

//Agregar un nuevo producto: 

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    try {
        await manager.addProduct(nuevoProducto); 
        res.status(201).send("Producto agregado"); 
        
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

export default router;