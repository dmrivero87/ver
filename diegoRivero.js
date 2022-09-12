let usuarios_registrados = [
    {nombre: "Juana" , apellido: "Perez" , doc_id: 13382450 , direccion: "Fernandez Crespo 2154"},
    {nombre: "Diego" , apellido: "Rivero" , doc_id: 45579872 , direccion: "Yatay 1428"},
    {nombre: "Ignacio" , apellido: "Caballero" , doc_id: 43214560 , direccion: "Enrique Brito 987"},
    {nombre: "Federico" , apellido: "Baricevich" , doc_id: 39857415 , direccion: "Tacuarembo 7413"},
    {nombre: "Alejandra" , apellido: "Valentin" , doc_id: 38974168 , direccion: "Av. Italia 4563"},
    {nombre: "Fernando" , apellido: "Rodriguez" , doc_id: 19874451 , direccion: "Ayacucho 6402"},
    {nombre: "Felipe" , apellido: "Peluffo" , doc_id: 54789638 , direccion: "Cañas 12"},
    
]
const form_registro = document.getElementById("registrarse");
const registro_nombre = document.getElementById("nombre");
const registro_apellido = document.getElementById("apellido");
const registro_doc_id = document.getElementById("doc_id");
const registro_direccion= document.getElementById("domicilio");
const registro_pass= document.getElementById("password");
const alerta_registro = document.getElementById("alerta-registro")

const form_login = document.getElementById("log_usuario");
const login_usuario = document.getElementById("usuario");
const login_pass = document.getElementById("contraseña");
const id_error = document.getElementById("error")
let registro_usuario = [];


class Usuario{
    constructor(nombre,apellido,doc_id,direccion,password){

        this.nombre = nombre;
        this.apellido = apellido;
        this.doc_id = doc_id;
        this.direccion = direccion;
        this.password = password;
    }
}

form_registro.addEventListener("click", (e) => {

   e.preventDefault();

    if (registro_nombre.value != "" && registro_apellido.value != "" && registro_doc_id.value != "" && registro_direccion.value !="" && registro_pass.value != "" ){
    let new_user = new Usuario(registro_nombre.value, registro_apellido.value, registro_doc_id.value , registro_direccion.value, registro_pass.value );
        
    registro_usuario.push(new_user);
    console.log(registro_usuario);  
    alerta_registro.innerHTML = `<p> Bienvenido ${registro_nombre.value} , su usuario es ${doc_id.value}</p>`;
    
    }else{
        alerta_registro.innerHTML = `<p> Error : Verifique que no quede ninguna opcion vacia`;
    }
})

form_login.addEventListener("submit", (e) => {
    e.preventDefault();

    let usuario_reg = login_usuario.value;
    let pass_reg = login_pass.value;
    
    for (let user_id of registro_usuario){
        if (usuario_reg == user_id.doc_id && pass_reg == user_id.password ){
            id_error.innerHTML = `<p>Bienvenido ${registro_nombre.value}</p>`
            const usuario_JSON = JSON.stringify(registro_nombre.value)
            localStorage.setItem("usuario" , usuario_JSON);
           
        }else {
            id_error.innerHTML = `<p>NO COINCIDE USUARIO Y CONTRASEÑA, INTENTE NUEVAMENTE</p>`
            
        }
    }
})
const productos = [
    { id: 1, name : "Camiseta Principal", precio: 3500, img : 'imagenes/camiseta1-3.png', cantidad: 1 },
    { id: 2, name : "Camiseta Alternativa", precio: 3250, img : 'imagenes/camiseta2-3.png', cantidad: 1},
    { id: 3, name : "Pantalon Principal", precio : 2500, img : 'imagenes/short 1-1.png', cantidad: 1},
    { id: 4, name : "Pantalon Alternativa", precio : 2250 , img : 'imagenes/short 2-1.png', cantidad: 1},
    { id: 5, name : "Camiseta Niño", precio: 2500 , img : 'imagenes/camiseta n 1-1.png', cantidad: 1},
    { id: 6, name : "Camiseta Running", precio: 2000, img : 'imagenes/camiseta 3-1.png', cantidad: 1},
    { id: 7, name : "Campera", precio: 4500, img : 'imagenes/campera 1-1.png', cantidad: 1},
    { id: 8, name : "Camiseta Blanca", precio: 3250, img : 'imagenes/camiseta 4-2.png', cantidad: 1},
]

let talles = [
    {id:1 , name: "S"},
    {id:2 , name: "M"},
    {id:3 , name: "L"},
    {id:4 , name: "XL"}
  

]

const contenedor_productos = document.querySelector(".contenedor-compra");
//const contenedor_pedidos = document.querySelector(".listado-pedido")
let tabla = document.getElementById("tbody");
let tabla_total = document.getElementById("tbody2");
let orden_pedido = [];
let total_a_pagar = [];

function mostrar_productos(){
    productos.forEach(function (producto) {
        const div_productos = document.createElement("div");
        div_productos.classList.add("card")
        
        const imagen_producto = document.createElement("img");
        imagen_producto.src = producto.img;
        imagen_producto.className = "imagen-producto";

        const titulo_producto = document.createElement("h2");
        titulo_producto.textContent = producto.name;
        titulo_producto.classList.add("titulo-producto");

        const precio_producto = document.createElement("h3");
        precio_producto.textContent = producto.precio

        const btn_compra = document.createElement("button");
        btn_compra.textContent = "Agregar al pedido";
        btn_compra.classList.add("btn-comprar");
        btn_compra.addEventListener("click", function(){
        agregar_carrito(producto.id);
        })
        
        div_productos.appendChild(imagen_producto);
        div_productos.appendChild(titulo_producto);
        div_productos.appendChild(precio_producto);
        div_productos.appendChild(btn_compra);

        contenedor_productos.appendChild(div_productos);
        
    });
}


document.addEventListener("DOMContentLoaded", function() {

    mostrar_productos();
}) 



function agregar_carrito(id){

   const compra_productos = productos.find( (producto) => {
   return producto.id === id
   });
   orden_pedido.push(compra_productos);
   const carrito_JSON = JSON.stringify(orden_pedido);
   localStorage.setItem("carrito" , carrito_JSON);
   let temp_carrito = JSON.parse(localStorage.getItem("carrito"));
   
   ver_pedido();
}



function ver_pedido(){

  
   let orden_pedido = JSON.parse(localStorage.getItem("carrito"));
   
    console.log(orden_pedido);
   
    tabla.innerHTML="";

    orden_pedido.forEach((producto)=>{
        const fila_carrito = document.createElement("tr");
        fila_carrito.innerHTML += `<td><img class="imagen-productos" src="${producto.img}"></img></td>
                                   <td>${producto.name}</td>
                                   <td>${producto.cantidad}</td>
                                   <td>talle</td>
                                   <td> $ ${producto.precio}</td>
                                   <td><button class="btn-borrar">Borrar</button></td>`;

        
        
        tabla.append(fila_carrito);       
        
        const btn_borra_fila = document.querySelectorAll(".btn-borrar");
        console.log(btn_borra_fila);
        for (let boton of btn_borra_fila){
            boton.addEventListener("click", borrar_fila)
        }

        total_precio_compra ()
    })
}
function borrar_fila(e){
    let abuelo = e.target.parentNode.parentNode;
    abuelo.remove();
    
}

function total_precio_compra (){

        let recuperar_carritos = JSON.parse(localStorage.getItem("carrito"));
        console.log(recuperar_carritos);
       
        tabla_total.innerHTML="";
    
        recuperar_carritos.forEach((producto)=>{
    
        const total_precio_compra = recuperar_carritos.reduce((acumulador, objeto) => {
        return acumulador + objeto.precio; }, 0) ;

        console.log(total_precio_compra);

        const fila_total = document.createElement("tr");
        fila_total.innerHTML = `<td>TOTAL COMPRA :  $           ${total_precio_compra}</td>
                                <button id = "btn-fin"class="btn-comprar">Comprar</button>`;

        
        
        tabla_total.append(fila_total);           
        let btn_fin = document.getElementById("btn-fin")
        btn_fin.addEventListener("click", compra_final)
        })
    
    
}

function compra_final(e){
       
    localStorage.clear();
    tabla.innerHTML ="";
    tabla_total.innerHTML ="";
    
}
