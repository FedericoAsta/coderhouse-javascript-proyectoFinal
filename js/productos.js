// FETCH

let instrumentos = []

fetch("https://63bf5595e262345656e7882f.mockapi.io/Instrumentos") 
.then((respuesta) => respuesta.json())  
.then((data) => {
    instrumentos = data
    tarjetas.innerHTML = cardsHTML(instrumentos)
    aplicarModo()
    subirAlCarrito()
}) 
.catch(() => console.log("No funciona MOCKAPI"))


// IMPRIME EL ARRAY EN FORMA DE CARDS

function cardsHTML (array) {
    const arrayToString = array.reduce((acc,element) => {
        return acc + `
        <section class="card" id="card-${element.id}">
            <div class="cardImg"><img src=".${element.imagen}" alt=${element.descripcion}></div>
            <div class="cardText"><p>${element.producto}</p></div>
            <div class="cardPrice"><p>${element.precio} USD</p></div>
            <button class="cardCarrito" id="button-${element.id}"><p>Añadir al carrito</p></a></button>
        </section>
        `
    },"")
    return arrayToString
}

const tarjetas = document.querySelector(".cardFlex")
tarjetas.innerHTML = cardsHTML(instrumentos)


// Funcion para ordenar el array por nombre
function ordenarNombre (array,orden) {
    const arrayOrdenado = [...array]
    if (orden) {
        arrayOrdenado.sort((a,b) => {   
            if (a.producto < b.producto) {
                return -1  
            } else if (a.producto > b.producto) {
                return 1 
            } else {
                return 0  
            }
        })
    } else if (!orden) {
        arrayOrdenado.sort((a,b) => {   
            if (a.producto > b.producto) {
                return -1  
            } else if (a.producto < b.producto) {
                return 1 
            } else {
                return 0  
            }
        })
    }
    return arrayOrdenado
}

// Funcion para ordenar el array por precio
function ordenarPrecio (array,orden) {
    const arrayOrdenado = [...array]
    if (orden) {
        arrayOrdenado.sort((a,b) => {   
            if (a.precio < b.precio) {
                return -1  
            } else if (a.precio > b.precio) {
                return 1 
            } else {
                return 0  
            }
        })
    } else if (!orden) {
        arrayOrdenado.sort((a,b) => {   
            if (a.precio > b.precio) {
                return -1  
            } else if (a.precio < b.precio) {
                return 1 
            } else {
                return 0  
            }
        })
    }
    return arrayOrdenado
}

// Filtrar ofertas
function verOfertas (array) {
    const arrayFiltrado = array.filter((elemento) => elemento.oferta)
    return arrayFiltrado
}

// Interacción con Local Storage

const objetoAJson = (valor) => {
    return JSON.stringify(valor)
}

const stringAJson = (valor) => {
    return JSON.parse(valor)
}

const almacenarLS = (clave,valor) => {
    return localStorage.setItem(clave,objetoAJson(valor))
}

const extraerLS = (key) => {
    return stringAJson(localStorage.getItem(key))
}

// Pushear a un array

const arrayPush = (array,elemento) => {
    return array.push(elemento)
}

// Buscar producto

const buscarProducto = (productId, array) => {
    return array.find(element => {
        return element.id === Number(productId)
    })
}


// FUNCION QUE APLICA EL MODO 

const aplicarModo = () => {
    const modo = extraerLS("modoOscuro")
    if (modo === "si") {
        estiloOscuro()
        modoOscuro.style.backgroundColor = "#e63e3e"
        modoClaro.style.backgroundColor = "#b8dbd9ff"
    } else if (modo === "no") {
        estiloClaro()
        modoClaro.style.backgroundColor = "#e63e3e"
        modoOscuro.style.backgroundColor = "#b8dbd9ff"
    }
}

// FUNCION QUE APLICA EL FORMATO

const estiloOscuro = () => {
    const body = document.querySelector("body")
    const tituloPrincipal = document.querySelector(".tituloPrincipal")
    const card = document.querySelectorAll(".card")
    const cardText = document.querySelectorAll(".cardText")
    const cardPrice = document.querySelectorAll(".cardPrice")
    body.style.backgroundColor = "#000000ff"
    tituloPrincipal.style.color =  "#f4f4f9ff"
    card.forEach((item) => item.style.backgroundColor = "#2A2627")
    cardText.forEach((item) => item.style.color = "#f4f4f9ff")
    cardPrice.forEach((item) => item.style.color = "#f4f4f9ff")
}

const estiloClaro = () => {
    const body = document.querySelector("body")
    const tituloPrincipal = document.querySelector(".tituloPrincipal")
    const card = document.querySelectorAll(".card")
    const cardText = document.querySelectorAll(".cardText")
    const cardPrice = document.querySelectorAll(".cardPrice")
    body.style.backgroundColor = "#f4f4f9ff"
    tituloPrincipal.style.color =  "#000000ff"
    card.forEach((item) => item.style.backgroundColor = "white")
    cardText.forEach((item) => item.style.color = "#2f4550ff")
    cardPrice.forEach((item) => item.style.color = "#000000ff")
}


// -- FUNCION PARA NOTIFICACIONES -- 

const notificacionToast = (texto) => {
    Toastify({
        text: texto,
        duration: 2000,
        close: true,
        position: "right",
        gravity: "top",
        style: {
            background: "#b8dbd9ff",
            color: "black",
            
        }
    }).showToast()
}



// Interacción con el DOM

const sinOrdenVar = document.querySelector("#sinOrden")
const ordenarAZVar = document.querySelector("#ordenarAZ")
const ordenarZAVar = document.querySelector("#ordenarZA")
const mayorPrecioVar = document.querySelector("#mayorPrecio")
const menorPrecioVar = document.querySelector("#menorPrecio")
const ofertasVar = document.querySelector("#ofertas")


// ACCIONES DE BOTONES
sinOrdenVar.onclick = () => {
    tarjetas.innerHTML = cardsHTML(instrumentos)
    aplicarModo()
    subirAlCarrito()
}

ordenarAZVar.onclick = () => {
    console.log("Productos ordenados de A-Z")
    tarjetas.innerHTML = cardsHTML(ordenarNombre(instrumentos,true))
    aplicarModo()
    subirAlCarrito()
}

ordenarZAVar.onclick = () => {
    console.log("Productos ordenados de Z-A")
    tarjetas.innerHTML = cardsHTML(ordenarNombre(instrumentos,false))
    aplicarModo()
    subirAlCarrito()
}

menorPrecioVar.onclick = () => {
    console.log("Productos ordenados por menor precio")
    tarjetas.innerHTML = cardsHTML(ordenarPrecio(instrumentos,true))
    aplicarModo()
    subirAlCarrito()
}

mayorPrecioVar.onclick = () => {
    console.log("Productos ordenados por mayor precio")
    tarjetas.innerHTML = cardsHTML(ordenarPrecio(instrumentos,false))
    aplicarModo()
    subirAlCarrito()
}

ofertasVar.onclick = () => {
    console.log("Productos filtrados por ofertas")
    tarjetas.innerHTML = cardsHTML(verOfertas(instrumentos))
    aplicarModo()
    subirAlCarrito()
}


// -- MODO OSCURO --

const modoOscuro = document.querySelector("#modoOscuro")
const modoClaro = document.querySelector("#modoClaro")


// EVENTOS

aplicarModo()

modoOscuro.onclick = () => {
    almacenarLS("modoOscuro","si")
    aplicarModo()
}

modoClaro.onclick = () => {
    almacenarLS("modoOscuro","no")
    aplicarModo()
}

// CARRITO

let carrito = []

const subirAlCarrito = () => {
    const cardButton = document.querySelectorAll(".cardCarrito")
    cardButton.forEach(boton => {
        boton.onclick = () => {
            const extraerId = boton.id.slice(7)
            const producto = buscarProducto(extraerId, instrumentos)
            console.log(producto)
            console.log(carrito)
            arrayPush(carrito,producto)
            almacenarLS("carrito",carrito)
            subirAlCarrito()
            notificacionToast("Añadiste un producto al carrito")
        }
    }
)}

subirAlCarrito()

carritoNuevo = extraerLS("carrito") || []
carrito = carritoNuevo

