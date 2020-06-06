window.onload = init;//Le decimos que cunado el navegador cargue inicie la funcion init
var Vurl = "http://localhost:3000/empleados/get";

function init() {
    document.querySelector('#BuscarEmpleado').addEventListener('click', Buscar);
}

function Buscar() {
    var nombre = document.getElementById('Nom').value;
    var apell = document.getElementById('Ape').value;

    var ContenidoExistente = document.getElementById("ContenidoInput");
    ContenidoExistente.style.display = 'none';
    var Res = document.getElementById("Resultado");

    axios({
        method: 'post',
        url: Vurl,
        data: {
            name: nombre,
            apellido: apell
        }
    }).then(function (res) {
        if (res.data.code === 200) {
            var Salto = document.createElement("br");
            var Salto1 = document.createElement("br");
            var Salto2 = document.createElement("br");
            var Salto3 = document.createElement("br");
            var Salto4 = document.createElement("br");
            var Salto5 = document.createElement("br");

            var texto = document.createTextNode(
                "EmpleadoID: " + res.data.message[0].empleadoID);
            Res.appendChild(texto);
            Res.appendChild(Salto);

            var texto = document.createTextNode(
                "Nombre: " + res.data.message[0].nombre);
            Res.appendChild(texto);
            Res.appendChild(Salto1);

            var texto = document.createTextNode(
                "Apellidos: " + res.data.message[0].apellido);
            Res.appendChild(texto);
            Res.appendChild(Salto2);

            var texto = document.createTextNode(
                "Telefono: " + res.data.message[0].telefono);
            Res.appendChild(texto);
            Res.appendChild(Salto3);

            var texto = document.createTextNode(
                "Dirección: " + res.data.message[0].direccion);
            Res.appendChild(texto);
            Res.appendChild(Salto4);

            var texto = document.createTextNode(
                "Correo: " + res.data.message[0].correo);
            Res.appendChild(texto);
            Res.appendChild(Salto5);
        }
        else {
            var textoSinUsuario = document.createTextNode("No se encontró un usuario con ese nombre y apellido");
            Res.appendChild(textoSinUsuario);
        }
    }).catch(function (err) {
        if (nombre == "" || apell == "") {
            var textoSinUsuario = document.createTextNode("No llenaste correctamente todos los campos");
            Res.appendChild(textoSinUsuario);
        }
        else {
            var textoSinUsuario = document.createTextNode("Error con el servidor");
            Res.appendChild(textoSinUsuario);
        }
    })
}