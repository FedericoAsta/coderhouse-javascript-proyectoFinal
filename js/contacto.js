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
    const tituloPrincipal = document.querySelectorAll(".contactInfo")
    const subtituloPrincipal = document.querySelector(".contactSubtitulo")
    const subtituloForm = document.querySelectorAll("#formTitle")
    body.style.backgroundColor = "#000000ff"
    tituloPrincipal.forEach((item) => item.style.color = "#f4f4f9ff")
    subtituloPrincipal.style.color = "#b8dbd9ff"
    subtituloForm.forEach((item) => item.style.color = "#b8dbd9ff")
}

const estiloClaro = () => {
    const body = document.querySelector("body")
    const tituloPrincipal = document.querySelectorAll(".contactInfo")
    const subtituloPrincipal = document.querySelector(".contactSubtitulo")
    const subtituloForm = document.querySelectorAll("#formTitle")
    body.style.backgroundColor = "#f4f4f9ff"
    tituloPrincipal.forEach((item) => item.style.color = "#000000ff")
    subtituloPrincipal.style.color = "#000000ff"
    subtituloForm.forEach((item) => item.style.color = "#000000ff")
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
            background: "#b8dbd9ff",
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

aplicarModo()


// VALIDACION DE FORMULARIO

const formulario = document.querySelector("form")

let mensajes = []

// nombre , apellido , mail

validarMail = (mail) => {
    console.log(mail.lenght)
    for (i = 0; i < mail.lenght ; i++) {
        return console.log("HOLA")
    } 
}

console.log(validarMail("fff"))


validarFormulario = () => {
    if (nombre.value === "" || apellido.value === "" || mail.value === "")  {
        swal("Tenes que completar todos los campos del formulario",{  
            dangerMode: true
        })
    } else if (validarMail(mail.value) === false) {
        swal("La dirección de correo electrónico no es válida",{  
            dangerMode: true
        })
    } else {
        mensajes.push({
            nombreUser: nombre.value,
            apellidoUser: apellido.value,
            mailUser: mail.value
        })
        almacenarLS("mensajes",mensajes)
        swal({
            title: "Mensaje Enviado",
            text:"¡Muchas gracias! Nos comunicaremos pronto con vos a tu dirección de correo electrónico.",
            icon: "success",
        });
    }
}


formulario.onsubmit = () => {
    event.preventDefault()   
    validarFormulario()
}

mensajesNuevo = extraerLS("mensajes") || []
mensajes = mensajesNuevo

const eliminarMensajes = document.querySelector("#vaciarMensajes")
eliminarMensajes.onclick = () => {
    swal({ 
        title:"Advertencia",
        text:"¿Estas seguro que queres borrar el registro de contactos?",
        dangerMode: true,
        buttons: {
            cancelar: "Cancelar",
            aceptar: "Ok"
        }
    })
    .then( value => {
        if ( value === "aceptar" ){
            vaciarMensajes()
            swal({ 
                title:"LISTO",
                text:"Registro de mensajes eliminado",
                icon: "success",
            })
        }
    })
}

vaciarMensajes = () => {
    mensajes = []
    almacenarLS("mensajes",mensajes)
}