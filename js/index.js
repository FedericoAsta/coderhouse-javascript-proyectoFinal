
// IMPRIME EL ARRAY EN FORMA DE CARDS

function cardsHTML (array) {
    const contenedor = document.querySelector("#productCards")
    const tarjetas = document.createElement("div")
    tarjetas.className = "cardFlex"
    contenedor.appendChild(tarjetas)
    const arrayToString = array.reduce((acc,element) => {
        return acc + `
        <section class="card">
            <div class="cardImg"><img src=${element.imagen} alt=${element.descripcion}></div>
            <div class="cardText"><p>${element.producto}</p></div>
            <div class="cardPrice"><p>${element.precio} USD</p></div>
            <div class="cardButton"><p>Comprar</p></a></div>
        </section>
        `
    },"")
    tarjetas.innerHTML = arrayToString
}

// ELIMINA LAS CARDS CREADAS

function eliminaCards () {
    const contenedor = document.querySelector("#productCards")
    const nodoEliminado = document.querySelector(".cardFlex")
    contenedor.removeChild(nodoEliminado)
}

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

const almacenar = (clave,valor) => {
    localStorage.setItem(clave,objetoAJson(valor))
}

const extraer = (key) => {
    return stringAJson(localStorage.getItem(key))
}


// FUNCION QUE APLICA EL MODO 

const aplicarModo = () => {
    const modo = extraer("modoOscuro")
    if (modo === "si") {
        console.log("Aplicar modo oscuro")
        estiloOscuro()
        modoOscuro.style.backgroundColor = "#e63e3e"
        modoClaro.style.backgroundColor = "#b8dbd9ff"
    } else if (modo === "no") {
        console.log("Aplicar modo claro")
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


// Interacción con el DOM

const sinOrdenVar = document.querySelector("#sinOrden")
const ordenarAZVar = document.querySelector("#ordenarAZ")
const ordenarZAVar = document.querySelector("#ordenarZA")
const mayorPrecioVar = document.querySelector("#mayorPrecio")
const menorPrecioVar = document.querySelector("#menorPrecio")
const ofertasVar = document.querySelector("#ofertas")


// IMPRIME LAS CARDS EN LA PANTALLA
cardsHTML(instrumentos);


// ACCIONES DE BOTONES
sinOrdenVar.onclick = () => {
    console.log("Productos ordenados de A-Z")
    eliminaCards()
    cardsHTML(instrumentos,true)
    aplicarModo()
}

ordenarAZVar.onclick = () => {
    console.log("Productos ordenados de A-Z")
    eliminaCards()
    cardsHTML(ordenarNombre(instrumentos,true))
    aplicarModo()
}

ordenarZAVar.onclick = () => {
    console.log("Productos ordenados de Z-A")
    eliminaCards()
    cardsHTML(ordenarNombre(instrumentos,false))
    aplicarModo()
}

menorPrecioVar.onclick = () => {
    console.log("Productos ordenados por menor precio")
    eliminaCards()
    cardsHTML(ordenarPrecio(instrumentos,true))
    aplicarModo()
}

mayorPrecioVar.onclick = () => {
    console.log("Productos ordenados por mayor precio")
    eliminaCards()
    cardsHTML(ordenarPrecio(instrumentos,false))
    aplicarModo()
}

ofertasVar.onclick = () => {
    console.log("Productos filtrados por ofertas")
    eliminaCards()
    cardsHTML(verOfertas(instrumentos))
    aplicarModo()
}


// -- MODO OSCURO --

const modoOscuro = document.querySelector("#modoOscuro")
const modoClaro = document.querySelector("#modoClaro")


// EVENTOS

aplicarModo()

modoOscuro.onclick = () => {
    almacenar("modoOscuro","si")
    aplicarModo()
}

modoClaro.onclick = () => {
    almacenar("modoOscuro","no")
    aplicarModo()
}

console.log(card)