// Interacción con Local Storage

const objetoAJson = (valor) => {
    return JSON.stringify(valor)
}

const stringAJson = (valor) => {
    return JSON.parse(valor)
}

const almacenarLS = (key,valor) => {
    return localStorage.setItem(key,objetoAJson(valor))
}

const extraerLS = (key) => {
    return stringAJson(localStorage.getItem(key))
}

// Pushear a un array

const Apush = (array,value) => {
    array.push(value)
}

// Buscar producto

const buscarProducto = (productId, array) => {
    return array.find(element => {
        return element.id === Number(productId)
    })
}

// MODO OSCURO
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
    const totalCarritoText = document.querySelector("#totalCarritoText")
    const card = document.querySelectorAll(".cardHorizontal")
    const cardText = document.querySelectorAll(".cardText")
    const cardPrice = document.querySelectorAll(".cardPrice")
    body.style.backgroundColor = "#000000ff"
    tituloPrincipal.style.color =  "#f4f4f9ff"
    totalCarritoText.style.color = "#f4f4f9ff"
    card.forEach((item) => item.style.backgroundColor = "#2A2627")
    cardText.forEach((item) => item.style.color = "#f4f4f9ff")
    cardPrice.forEach((item) => item.style.color = "#f4f4f9ff")
}

const estiloClaro = () => {
    const body = document.querySelector("body")
    const tituloPrincipal = document.querySelector(".tituloPrincipal")
    const totalCarritoText = document.querySelector("#totalCarritoText")
    const card = document.querySelectorAll(".cardHorizontal")
    const cardText = document.querySelectorAll(".cardText")
    const cardPrice = document.querySelectorAll(".cardPrice")
    body.style.backgroundColor = "#f4f4f9ff"
    tituloPrincipal.style.color =  "#000000ff"
    totalCarritoText.style.color = "#000000ff"
    card.forEach((item) => item.style.backgroundColor = "white")
    cardText.forEach((item) => item.style.color = "#2f4550ff")
    cardPrice.forEach((item) => item.style.color = "#000000ff")
}


// -- FUNCION PARA NOTIFICAIONES -- 

const notificacionToast = (texto) => {
    Toastify({
        text: texto,
        duration: 2000,
        close: true,
        position: "right",
        gravity: "top",
        style: {
            background: "#e63e3e",
            color: "black",
        }
    }).showToast()
}


// -- SWEET ALERT -- 

const swalDanger = (text) => {
    swal(text,{  
        dangerMode: true,
        buttons: {
            cancelar: "Cancelar",
            aceptar: "Ok"
        }
    })
}

const swalForm = () => {
    swal("¿Queres finalizar tu compra?", {
        buttons: {
            cancelar: "No",
            aceptar: "Si"
        }
    })
    .then( value => {
        if ( value === "aceptar" ){
            swal("Compra finalizada satisfactoriamente", {
                icon: "success",
            });
        } 
    })
}


// EJECUCION MODO OSCURO

modoOscuro.onclick = () => {
    almacenarLS("modoOscuro","si")
    aplicarModo()
}

modoClaro.onclick = () => {
    almacenarLS("modoOscuro","no")
    aplicarModo()
}


// FUNCION CREADORA DE CARDS

function cardsCarrito (array) {
    const arrayToString = array.reduce((acc,element) => {
        return acc + `
        <section class="cardHorizontal" id="card-${element.id}">
            <div class="cardText"><p id="carritoText">${element.producto}</p></div>
            <div class="cardPrice"><p id="carritoPrice">${element.precio} USD</p></div>
            <button class="cardCarritoButton" id="button-${element.id}"><p>Quitar</p></a></button>
        </section>
        `
    },"")
    return arrayToString
}


// SUMAR CARRITO

sumarCompras = (array) => {
    let total = 0
    array.forEach((element) => {
        total = total + Number(element.precio)
        return total
    })
    return total
}

function totalCarrito (array) {
    if (Number(sumarCompras(array)) === 0) {
        return `
        <section class="cardHorizontal" id="totalizador">
        <div class="cardText"><p id="totalCarritoText">Carrito vacío</p></div>
        <div class="cardPrice"><p id="totalCarritoPrice"><a href="../pages/productos.html">Agregar productos</a></p></div>
    </section>
        `
    } else {
        const totalCarrito = sumarCompras(array)
        return `
        <section class="cardHorizontal" id="totalizador">
            <div class="cardText"><p id="totalCarritoText">TOTAL:</p></div>
            <div class="cardPrice"><p id="totalCarritoPrice">${totalCarrito} USD</p></div>
        </section>
        `
    }
}


// LOGICA CARRITO

extraerLS("carrito")
carrito = extraerLS("carrito") || []   // No necesito un fetch porque ahora mi array 'carrito' lo traigo de local storage.
console.log(carrito)

const tarjetas = document.querySelector(".cardFlexCarrito")
tarjetas.innerHTML = cardsCarrito(carrito)

const tarjetaTotal = document.querySelector("#tarjetaTotal")
tarjetaTotal.innerHTML = totalCarrito(carrito)
aplicarModo()


// FUNCION PARA BORRAR EL CARRITO TOTALMENTE

limpiarCarrito = () => {
    localStorage.removeItem("carrito")
    carrito = []
}

const carritoClear = document.querySelector("#carritoClear")
carritoClear.onclick = () => {
    if (Number(sumarCompras(carrito)) === 0) {
        swal("No tenes ningun producto en el carrito",{  
            icon:"error",
            dangerMode: true
        })
    } else {
        swal("¿Estás seguro que queres eliminar todo el carrito?",{  
            dangerMode: true,
            buttons: {
                cancelar: "Cancelar",
                aceptar: "Ok"
            }
        })
        .then( value => {
            if ( value === "aceptar" ){
                limpiarCarrito()
                console.log("Carrito eliminado")
                console.log(carrito)
                tarjetas.innerHTML = cardsCarrito(carrito)
                tarjetaTotal.innerHTML = totalCarrito(carrito)
                aplicarModo()
                notificacionToast("Carrito Eliminado")
            }
        })
    }
}

// CONFIRMAR COMPRA

const comprar = document.querySelector("#confirmarCompra")
comprar.onclick = () => {
    if (Number(sumarCompras(carrito)) === 0) {
        swal("No tenes ningun producto en el carrito",{  
            dangerMode: true,
            icon:"error"
        })
    } else {
        swal("¿Estás seguro que queres finalizar tu compra?",{  
            buttons: {
                cancelar: "Cancelar",
                aceptar: "Ok"
            }
        })
        .then( value => {
            if ( value === "aceptar" ){
                swal({
                    title:"¡Listo!",
                    text:"La compra finalizó satisfactoriamente.",
                    icon: "success",
                });
                limpiarCarrito()
                tarjetas.innerHTML = cardsCarrito(carrito)
                tarjetaTotal.innerHTML = totalCarrito(carrito)
                aplicarModo()
            }
        })
    }
}


// QUITAR SOLO UN PRODUCTO DEL CARRITO
const quitarProducto = () => {
    const botonQuitar = document.querySelectorAll(".cardCarritoButton")
    botonQuitar.forEach(boton => {
        boton.onclick = () => {
            swal("¿Estás seguro que queres eliminar este producto del carrito?",{  
                dangerMode: true,
                buttons: {
                    cancelar: "Cancelar",
                    aceptar: "Ok"
                }
            })
            .then( value => {
                if ( value === "aceptar" ){
                    const extraerId = boton.id.slice(7)
                    const productoABorrar = buscarProducto(extraerId, carrito)
                    const carritoFiltrado = carrito.filter((item) => item != productoABorrar)
                    carrito = carritoFiltrado
                    almacenarLS("carrito",carrito)
                    tarjetas.innerHTML = cardsCarrito(carrito)
                    tarjetaTotal.innerHTML = totalCarrito(carrito)
                    aplicarModo()
                    quitarProducto()
                    notificacionToast("Producto eliminado")
                }
            })
        }
    }
)}

quitarProducto()



