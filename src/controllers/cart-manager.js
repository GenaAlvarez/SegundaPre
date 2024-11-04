import fs from 'fs/promises';

// class CartManager {
//     constructor(path) {
//         this.path = path; 
//         this.carts = []; 
//         this.ultId = 0; 

//         //Cargar los carritos almacenados en el archivo: 
//         this.cargarCarritos(); 
//     }

//     //Crear dos metodos auxiliares para cargar y leer archivos. 

//     async cargarCarritos() {
//         try {
//             const data = await fs.readFile(this.path, "utf-8"); 
//             this.carts = JSON.parse(data); 

//             if(this.carts.length > 0) {
//                 //Verifico que exista un elemento creado. 
//                 this.ultId = Math.max(...this.carts.map(cart => cart.id)); 
//                 //Utilizo el método map para crear un nuevo array que solo tenga los id del carrito y con Math.max obtengo el mayor. 
//             }

//         } catch (error) {
//             console.log("Error al cargar los carritos desde el archivo", error);
//             //Si no existe el archivo, lo voy a crear. 
//             await this.guardarCarritos(); 
//         }
//     }

//     async guardarCarritos() {
//         await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2)); 
//     }

//     //Primer consigna crear el carrito: 

//     async crearCarrito(){
//         const nuevoCarrito = {
//             id: ++this.ultId,
//             products: []
//         }

//         this.carts.push(nuevoCarrito); 

//         //Guardamos el array en el archivo: 
//         await this.guardarCarritos(); 
//         return nuevoCarrito; 
//     }

//     //Retorne un carrito por id:

//     async getCarritoById(carritoId) {
//         try {
//             const carrito = this.carts.find(c => c.id === carritoId); 

//             if( !carrito ) {
//                 throw new Error("No existe un carrito con ese id"); 
//             }

//             return carrito; 
//         } catch (error) {
//             console.log("Error al obtener el carrito por id"); 
//             throw error; 
//         }
//     }

//     //Agregar productos al carrito: 

//     async agregarProductosAlCarrito(carritoId, productoId, quantity = 1) {
//         const carrito = await this.getCarritoById(carritoId); 
//         const existeProducto = carrito.products.find(p => p.product === productoId);

//         if(existeProducto) {
//             existeProducto.quantity += quantity; 
//         } else {
//             carrito.products.push({product: productoId, quantity});
//         }

//         await this.guardarCarritos();
//         return carrito; 
//     }

// }

// export default CartManager;

class CartManager {
    constructor(path = 'carrito.json') {  // Ruta predeterminada si no se pasa `path`
        this.path = path; 
        this.carts = []; 
        this.ultId = 0; 

        // Cargar los carritos almacenados en el archivo
        this.cargarCarritos(); 
    }

    // Crear dos métodos auxiliares para cargar y guardar archivos

    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf-8"); 
            this.carts = JSON.parse(data); 

            if (this.carts.length > 0) {
                // Si hay elementos en el archivo, actualiza `ultId` al mayor `id`
                this.ultId = Math.max(...this.carts.map(cart => cart.id)); 
            }

        } catch (error) {
            console.log("Error al cargar los carritos desde el archivo:", error.message);
            // Si no existe el archivo o hay un error, guarda los carritos en el archivo
            await this.guardarCarritos(); 
        }
    }

    async guardarCarritos() {
        if (!this.path) {
            throw new Error("La ruta del archivo 'path' no está definida.");
        }
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2)); 
            console.log("Carritos guardados correctamente.");
        } catch (error) {
            console.error("Error al guardar los carritos:", error.message);
        }
    }

    // Crear un carrito

    async crearCarrito() {
        const nuevoCarrito = {
            id: ++this.ultId,
            products: []
        };

        this.carts.push(nuevoCarrito); 

        // Guardamos el array en el archivo
        await this.guardarCarritos(); 
        return nuevoCarrito; 
    }

    // Retornar un carrito por id

    async getCarritoById(carritoId) {
        try {
            const carrito = this.carts.find(c => c.id === carritoId); 

            if (!carrito) {
                throw new Error("No existe un carrito con ese id"); 
            }

            return carrito; 
        } catch (error) {
            console.log("Error al obtener el carrito por id:", error.message); 
            throw error; 
        }
    }

    // Agregar productos al carrito

    async agregarProductosAlCarrito(carritoId, productoId, quantity = 1) {
        const carrito = await this.getCarritoById(carritoId); 
        const existeProducto = carrito.products.find(p => p.product === productoId);

        if (existeProducto) {
            existeProducto.quantity += quantity; 
        } else {
            carrito.products.push({product: productoId, quantity});
        }

        await this.guardarCarritos();
        return carrito; 
    }
}

export default CartManager;