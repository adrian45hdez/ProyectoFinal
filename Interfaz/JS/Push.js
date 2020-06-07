window.onload = init;//Le decimos que cunado el navegador cargue inicie la funcion init
var Vurl = "http://localhost:3000/empleados/push";

function init() {
    document.querySelector('#CrearEmpleado').addEventListener('click', Crear);
}

function Crear() {
    var nombreH = document.getElementById('input-nombre').value;
    var apellidoH = document.getElementById('input-apellido').value;
    var telefonoH = document.getElementById('input-telefono').value;
    var correoH = document.getElementById('input-correo').value;
    var direccionH = document.getElementById('input-direccion').value;

    var ContenidoExistente = document.getElementById("ContenidoInput");
    ContenidoExistente.style.display = 'none';
    var Res = document.getElementById("Resultado");
    
    axios({
        method: 'post',
        url: Vurl,
        data: {
            nombre: nombreH,
            apellido: apellidoH,
            telefono: telefonoH,
            correo: correoH,
            direccion: direccionH
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function (res) {
        if (res.data.code === 200) {
            var texto = document.createTextNode(
                "Usuario ingresado correctamente");
            Res.appendChild(texto);
        }
    }).catch(function (err) {
        if (nombreH =="" || apellidoH =="" || telefonoH =="" || correoH =="" || direccionH =="") {
            var textoSinUsuario = document.createTextNode("No llenaste correctamente todos los campos");
            Res.appendChild(textoSinUsuario);
        }
        else {
            var TextoError = document.createTextNode("Error con el servidor");
            Res.appendChild(TextoError);
        }
    })
    
}