import express from 'express';
import ProductManager from '../controllers/product-manager.js';

const router = express.Router();
const manager = new ProductManager();

router.get('/products', async (req, res) => {
    const productos = await manager.getProducts();
    res.render('home', {productos});
})
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
})

export default router;