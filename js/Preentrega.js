// Declaraciones
let accion
let nombre;
let documento;
let tipoDocumento;
let tipoDocumentoAux;
let tipoSocio = '';
let socio;
let continuar;
let continuarCheck;
let cantCuotas;
let idCuota;
let nroCuota;
let importe = 0;
let contador = 0;
let ciBusqueda;
let encontroSocio;
let arrayCuotas = [];
let clavesObtenidas = [];


//////SECCION CREACION DE USUARIO
//////SECCION CREACION DE USUARIO


///Funcion para validacion y asignacion tipoSocio + importe
function obtenerTipoSocio (tipoSocio){
    switch (tipoSocio) {
        case '1':
            importe = 500;
            socio = 'Básico';
            break;
        case '2':
            importe = 800;
            socio = 'Extra';
            break;
        case '3':
            importe = 1000;
            socio = 'Plus';
            break;
        default: 
            alert ('El tipo de socio ingresado no es válido');
    }
}

/// Funcion para validacion y asignacion tipoDocumento
function obtenerTipoDocumento (tipoDocumento){
    if (tipoDocumento == 1){
        tipoDocumentoAux = 'DNI';
    } else if (tipoDocumento == 2){
        tipoDocumentoAux = 'Pasaporte'
    } else {
        alert('Ingrese un documento válido');
    }
}

///Funcion Validacion nombre
function validarNombre (nombre){
    const alertaNombre = document.getElementById('alertaNombre');
    alertaNombre.classList.add ('alertaNombre');
    alertaNombre.classList.remove ('warnings-nombre');
    const bordeNombre = document.getElementById('nombre');
    bordeNombre.classList.remove('bordeNombre');
    if (nombre.length < 4){
        console.log ("muy corto");        
        alertaNombre.classList.remove ('alertaNombre');
        alertaNombre.classList.add ('warnings-nombre');
        bordeNombre.classList.add ('bordeNombre');
        ///se setea continuar en false para no crear el objeto si no valida
        continuar = 'no';
    }
}

///Funcion Validacion documento
function validarDocumento (documento){
    const alertaNombre = document.getElementById('alertaDocumento');
    alertaNombre.classList.add ('alertaDocumento');
    alertaNombre.classList.remove ('warnings-documento');
    const bordeNombre = document.getElementById('documento');
    bordeNombre.classList.remove('bordeDocumento');
    if (documento.length < 4){
        console.log ("muy corto");        
        alertaNombre.classList.remove ('alertaDocumento');
        alertaNombre.classList.add ('warnings-documento');
        bordeNombre.classList.add ('bordeDocumento');
        ///se setea continuar en false para no crear el objeto si no valida
        continuar = 'no';
    }
}

//Funcion que muestra creacion OK del socio

function creacionOK(creacionSocio){    
    creacionSocio.classList.remove('creacionNoOK');
    creacionSocio.classList.add('creacionOK');
}

//Funcion para guardar el objeto en localStorage

function guardarObjeto (idCuota, objeto){
    let clave = idCuota;
    console.log(clave);
    let objetoJSON =JSON.stringify(objeto);
    localStorage.setItem(clave, objetoJSON);
}


//Funcion submit que tomará los datos del formulario para armar las cuotas
function submit (e){
    e.preventDefault();
    continuar = 'si';
    tipoSocio = document.getElementById('tipoSocio').value;
    obtenerTipoSocio (tipoSocio);
    tipoDocumento = document.getElementById('tipoDocumento').value;
    obtenerTipoDocumento (tipoDocumento);
    cantCuotas = document.getElementById('cantCuotas').value;
    nombre = document.getElementById('nombre').value;
    validarNombre(nombre);
    documento = document.getElementById('documento').value
    validarDocumento (documento)
    const creacionSocio = document.getElementById('creacionSocio');
    creacionSocio.classList.add('creacionNoOK');
    creacionSocio.classList.remove('creacionOK');
    if(continuar !== 'no'){
        creacionOK(creacionSocio);
        for (i=1 ; i<= cantCuotas; i++){
            nroCuota = i;
            cuotaPaga = false;
            idCuota = documento + '_' + nroCuota
            const cuotaSocio1 = new CuotaSocio (nombre, tipoDocumentoAux, documento, socio, importe, nroCuota, cuotaPaga, idCuota);
            console.log (cuotaSocio1);
            console.log ("Guardando cuota...");
            guardarObjeto(idCuota, cuotaSocio1);
        }    
    }
    formulario.reset ();
}

const boton = document.querySelector('#btnSubmit');
boton.addEventListener ('click',submit);




////////SECCION BUSQUEDA DE USUARIO
////////SECCION BUSQUEDA DE USUARIO
////////SECCION BUSQUEDA DE USUARIO

///funcion que busca el documento ingresado y de existir lo agrega a un array con claves
function buscarClave (claveDocumento){
    clavesObtenidas = [];
    for (let i=0; i < localStorage.length; i++){
        let claveIn = localStorage.key(i);
        if (claveIn.includes(claveDocumento)){
            clavesObtenidas.push(claveIn);
        }
    }
}

///funcion que crea el HTML mostrando el listado de cuotas a pagar
function dibujarTabla (array){
    ///consultamos si hay cuotas a pagar
    const cuotasID = document.getElementById('cuotasID');
    cuotasID.innerHTML= ``;
    let cuotasListado = document.getElementById('cuotasListado');
    cuotasListado.classList.add('cuotasListadoNo');
    cuotasListado.classList.remove('cuotasListado')
    if (array.length === 0){
        let sinCuotas = document.getElementById('sinCuotas');
        console.log(sinCuotas);
        sinCuotas.classList.remove ('sinCuotasNo');
        sinCuotas.classList.add ('sinCuotas');
    } else {
        sinCuotas.classList.add ('sinCuotasNo')
        sinCuotas.classList.remove ('sinCuotas')
        cuotasListado.classList.remove('cuotasListadoNo');
        cuotasListado.classList.add('cuotasListado')
        array.forEach((item) => {        
            ////////CREAR CONDICION QUE CAMBIE VARIABLE CUOTAPAGA A TEXTO PAGO SI ES TRUE Y A BOTON SUBMIT (PAGAR) SI ES FALSE
            if (item.cuotaPaga === true){
                cuotasID.innerHTML = cuotasID.innerHTML + 
                `
                <tr>
                    <th scope="row">${item.nroCuota}</th>
                    <td>${item.documento}</td>
                    <td>${item.nombre}</td>
                    <td>${item.socio}</td>
                    <td>${item.importe}</td>
                    <td>PAGO</td>    
                <tr>
                `;
            }else {
                cuotasID.innerHTML = cuotasID.innerHTML + 
                `
                <tr>
                    <th scope="row">${item.nroCuota}</th>
                    <td>${item.documento}</td>
                    <td>${item.nombre}</td>
                    <td>${item.socio}</td>
                    <td>${item.importe}</td>
                    <td><button type="button" class="btn btn-outline-danger" id="${item.documento}_${item.nroCuota}">PAGAR</button></td> 
                <tr>
                `;  
            }
        })
        console.log (cuotasID);
    }
}


//FUNCION PARA PAGAR CUOTA UNA VEZ CREADOS LOS BOTONES
function pagarCuota(event){
    let botonE = event.target;
    let botonId = botonE.id;
    for (i = 0; i < arrayCuotas.length; i++){
        if((arrayCuotas[i].idCuota) === (botonId)){
            arrayCuotas[i].cuotaPaga = true;
            console.log(arrayCuotas[i].cuotaPaga);
            objeto = arrayCuotas[i];
            guardarObjeto (botonId, objeto);
        } 
    }
    btnBuscarUsuario.click();
}


//FUNCION QUE VALIDA EL DOCUMENTO QUE SE INGRESA PARA LA BUSQUEDA
function validarClaveDocumento (clave){
    const bordeDocumento = document.getElementById('claveDocumento');
    bordeDocumento.classList.remove('bordeDocumento');
    console.log(clave.length);
    if (clave.length < 4){
        console.log ("muy corto");        
        bordeDocumento.classList.add ('bordeDocumento');
        ///se setea continuar en false para no crear el objeto si no valida
        continuarCheck = 'no';
    }
}

///FUNCION PARA BUSCAR USUARIOS
function buscarUsuario (e2){
    continuarCheck = 'si';
    e2.preventDefault();
    arrayCuotas = [];
    let claveDocumento = document.getElementById('claveDocumento').value;
    validarClaveDocumento(claveDocumento);
    console.log(claveDocumento);    
    if (continuarCheck == 'no'){
        console.log('Se aborta busqueda');
    }else {
        buscarClave(claveDocumento);
        console.log('Muestro array con claves coincidentes');
        console.log(clavesObtenidas);
        /// recorremos el array con las calves encontradas y obtendremos los objetos JSON del localStorage
        for (let i = 0; i < clavesObtenidas.length; i++){
            let claveOut = clavesObtenidas[i];
            let objetoJSON = localStorage.getItem(claveOut);
            cuotaSocio2 = JSON.parse(objetoJSON);
            arrayCuotas.push(cuotaSocio2);
        }
        arrayCuotas.sort ((item1,item2) => {return item1.nroCuota - item2.nroCuota})
        console.log('Muestro Array con objeto cuotas')
        console.log(arrayCuotas);     
        ///Escribimos el HTML agregando el listado y los botones
        dibujarTabla(arrayCuotas);
        const botones = document.querySelectorAll('.btn-outline-danger');
        botones.forEach((boton) => {
        boton.addEventListener('click', pagarCuota);        
        });
    }
}
///BOTON BUSCAR USUARIO
const btnBuscarUsuario = document.querySelector('#btnBuscarUsuario');
btnBuscarUsuario.addEventListener('click', buscarUsuario);

