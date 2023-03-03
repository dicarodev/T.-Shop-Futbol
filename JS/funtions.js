/*CARRITO*/
const btnCar = document.querySelector('.contenedor_icono_carrito');
const containerCarProducts = document.querySelector('.contenedor_productos_carrito');

btnCar.addEventListener('click', () => {
    containerCarProducts.classList.toggle('hidden_car')
});

const carInfo = document.querySelector('.productos_carrito');
const filaProducto = document.querySelector('.fila_producto');

//Lee la lista de todos los contenedores (div) de productos//
const listaProducto = document.querySelector('.contenedor_items');

//Array de productos
let productos = [];

//Declaracion de constantes para el total a pagar y el contador del carrito
const valorTotal = document.querySelector('.total_pagar');
const contadorProductos = document.querySelector('#contador_productos');

//Funcion al evento del boton añadir carrito
listaProducto.addEventListener('click', e =>{
    if(e.target.classList.contains('btn_añadir_carrito')){
        const producto = e.target.parentElement;

        const infoProducto = {
            cantidad: 1,
            titulo: producto.querySelector('h2').textContent,
            precio: producto.querySelector('p').textContent,
        }

        const existe = productos.some(producto => producto.titulo === infoProducto.titulo);

        if (existe){
            const subProductos = productos.map(producto => {
                if(producto.titulo === infoProducto.titulo){
                    producto.cantidad++;
                    return producto;
                }else{
                    return producto;
                }
            })
            productos = [...subProductos];
        }else{
            productos = [...productos, infoProducto];
        }

        muestraHtml();
    }
});

//Evento boton eliminar producto del carrito
filaProducto.addEventListener('click', (e) => {
    if(e.target.classList.contains('icon_close')){
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('p').textContent;

        productos = productos.filter(producto => producto.titulo !== titulo);
        muestraHtml();
    }
});

//Función para mostrar el HTML del carrito
const muestraHtml = () => {

    /*if(!productos.length){
        containerCarProducts.innerHTML = `<p class="carritoVacio">El carrito está vacio.</p>`
    }*/
    //limpia html
    filaProducto.innerHTML = '';

    let total = 0;
    let totalProductos = 0;



    //añade elementos
    productos.forEach(producto => {
        const contenedorProductos = document.createElement('div');
        contenedorProductos.classList.add('productos_carrito');

        contenedorProductos.innerHTML = `
            <div class="info_productos_carrito">
                <span class="cantidad_producto_carrito">${producto.cantidad}</span>
                <p class="titulo_producto_carrito">${producto.titulo}</p>
                <span class="precio_producto_carrito">${producto.precio}</span>
            </div>
            <img src="./icons/x-lg.svg" alt="Icono cancelar producto" class="icon icon_close"></img>
        `

        filaProducto.append(contenedorProductos);

        total = total + parseInt(producto.cantidad * producto.precio.slice(1));
        totalProductos = totalProductos + producto.cantidad;
    });

    valorTotal.innerText = `$${total}`;
    contadorProductos.innerText = `${totalProductos}`;
};

/************************************************************/

/*MENU_MOVIL*/
const btnMenu = document.querySelector('.burguer');
const menu = document.querySelector('.menu');

btnMenu.addEventListener('click', () => {
    menu.classList.toggle('hidden_menu')
});

/************************************************************/

/*CAROUSEL*/
const grande = document.querySelector('.grande');
const punto = document.querySelectorAll('.punto');

//Asigna click a los puntos
    //Saber la posicion del punto
    //Aplicar transform translateX al grande
    //QUITAR la clase activo de TODOS los puntos
    //AÑADIR la clase activo al punto que hemos hecho click

punto.forEach( ( cadaPunto , i )=> {
    // Asignamos un CLICK a cadaPunto
    punto[i].addEventListener('click',()=>{
        // Guardar la posición de ese PUNTO
        let posicion  = i;
        // Calculando el espacio que debe DESPLAZARSE el GRANDE
        let operacion = posicion * -33;

        // MOVEMOS el grande
        grande.style.transform = `translateX(${ operacion }%)`;

        // Recorremos TODOS los punto
        punto.forEach( ( cadaPunto , i )=>{
            // Quitamos la clase ACTIVO a TODOS los punto
            punto[i].classList.remove('activo');
        });
        // Añadir la clase activo en el punto que hemos hecho CLICK
        punto[i].classList.add('activo');
    });
});