// Función para validar si el usuario es "admin"
function validarUsuario() {
    let user = prompt("Por favor, ingrese el usuario:");
    if (user === "admin") {
        alert("Bienvenido Administrador");
        menuPrincipal(); // Si es admin, inicia el menú principal
    } else {
        alert("Usuario de Administrador incorrecto");
    }
}

// Menú principal para navegar entre funciones
function menuPrincipal() {
    let opcion = prompt(`Elija una opción:
    1. Agregar Producto
    2. Modificar Producto
    3. Buscar Producto por Usuario
    4. Eliminar producto
    5. Exportar Datos
    6. Salir`);

    switch (opcion) {
        case "1":
            agregarProducto();
            break;
        case "2":
            modificarProducto();
            break;
        case "3":
            buscarProductoPorUsuario();
            break;
        case "4":
            eliminarProducto();
            break;
        case "5":
            exportarDatos();
            break;
        case "6":
            alert("Saliendo del sistema...");
            break;
        default:
            alert("Opción no válida.");
            menuPrincipal();
    }
}

// Array de productos 
let inventario = [];

// Función para agregar productos
function agregarProducto() {
    let productoTipo = prompt(`Elija el tipo de producto que desea agregar:
    1. Notebook
    2. Cámara web
    3. Disco duro
    4. Parlantes
    5. Otro insumo`);

    let marca = prompt("Ingrese la marca del producto:");
    let modelo = prompt("Ingrese el modelo del producto:");
    let serie = prompt("Ingrese el número de serie del producto:");

    // Validación de número de serie duplicado
    let productoExistente = inventario.find(producto => producto.serie === serie);
    if (productoExistente) {
        alert("Ya existe un producto con ese número de serie.");
        menuPrincipal();
        return; // Sale de la función si ya existe un producto con el mismo número de serie
    }

    let mac = prompt("Ingrese la dirección MAC (si aplica):");
    let ip = prompt("Ingrese la dirección IP (si aplica):");
    let estado = prompt("Ingrese el estado del producto (Nuevo/Usado):");
    let usuario = prompt("Ingrese el usuario asignado:");
    let uso = prompt("Ingrese el uso del producto:");

    // Se almacenan los productos como objetos
    let nuevoProducto = {
        tipo: obtenerNombreProducto(productoTipo),
        marca: marca,
        modelo: modelo,
        serie: serie,
        mac: mac,
        ip: ip,
        estado: estado,
        usuario: usuario,
        uso: uso
    };

    inventario.push(nuevoProducto);
    alert("Producto agregado correctamente:\n" + mostrarProducto(nuevoProducto));
    menuPrincipal();
}

// Función para modificar productos
function modificarProducto() {
    let buscarSerie = prompt("Ingrese el número de serie del producto que desea modificar:");
    let productoEncontrado = inventario.find(producto => producto.serie === buscarSerie);

    if (productoEncontrado) {
        alert("Producto encontrado: " + mostrarProducto(productoEncontrado));

        productoEncontrado.marca = prompt("Ingrese la nueva marca:", productoEncontrado.marca);
        productoEncontrado.modelo = prompt("Ingrese el nuevo modelo:", productoEncontrado.modelo);
        productoEncontrado.mac = prompt("Ingrese la nueva dirección MAC (si aplica):", productoEncontrado.mac);
        productoEncontrado.ip = prompt("Ingrese la nueva dirección IP (si aplica):", productoEncontrado.ip);
        productoEncontrado.estado = prompt("Ingrese el nuevo estado (Nuevo/Usado):", productoEncontrado.estado);
        productoEncontrado.usuario = prompt("Ingrese el nuevo usuario asignado:", productoEncontrado.usuario);
        productoEncontrado.uso = prompt("Ingrese el nuevo uso:", productoEncontrado.uso);

        alert("Producto modificado correctamente: " + mostrarProducto(productoEncontrado));
    } else {
        alert("Producto no encontrado.");
    }
    menuPrincipal();
}

// Función para buscar productos por usuario
function buscarProductoPorUsuario() {
    let usuarioBuscado = prompt("Ingrese el usuario para buscar productos:");
    let productosUsuario = inventario.filter(producto => producto.usuario === usuarioBuscado);

    if (productosUsuario.length > 0) {
        let resultado = "Productos encontrados para el usuario " + usuarioBuscado + ":\n";
        productosUsuario.forEach((producto, index) => {
            resultado += `Producto ${index + 1}:\n${mostrarProducto(producto)}\n`;
        });
        alert(resultado);
    } else {
        alert("No se encontraron productos para el usuario: " + usuarioBuscado);
    }
    menuPrincipal();
}

// Función auxiliar para obtener el nombre del producto basado en el número de caso
function obtenerNombreProducto(numeroProducto) {
    switch (numeroProducto) {
        case "1":
            return "Notebook";
        case "2":
            return "Cámara web";
        case "3":
            return "Disco duro";
        case "4":
            return "Parlantes";
        case "5":
            return "Otro insumo";
        default:
            return "Desconocido";
    }
}

// Función auxiliar para mostrar los detalles de un producto
function mostrarProducto(producto) {
    return `Tipo: ${producto.tipo}\nMarca: ${producto.marca}\nModelo: ${producto.modelo}\nSerie: ${producto.serie}\nMAC: ${producto.mac || 'N/A'}\nIP: ${producto.ip || 'N/A'}\nEstado: ${producto.estado}\nUsuario: ${producto.usuario}\nUso: ${producto.uso}`;
}

// Función para eliminar productos por número de serie
function eliminarProducto() {
    let buscarSerie = prompt("Ingrese el número de serie del producto que desea eliminar:");
    let productoEncontrado = inventario.find(producto => producto.serie === buscarSerie);

    if (productoEncontrado) {
        alert("Producto eliminado correctamente: " + mostrarProducto(productoEncontrado));
        // Filtra el inventario para eliminar el producto con el número de serie ingresado
        inventario = inventario.filter(producto => producto.serie !== buscarSerie);
    } else {
        alert("Producto no encontrado.");
    }
    menuPrincipal();
}


// Función para exportar datos
function exportarDatos() {
    let fecha = prompt("Elija la fecha desde cuando desea descargar un reporte (Formato: DD-MM-AAAA):");
    alert("Datos exportados desde la fecha: " + fecha);
    menuPrincipal();
}

// Ejecuta la validación del usuario al inicio
validarUsuario();
