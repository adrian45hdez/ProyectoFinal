window.onload = init;//Le decimos que cunado el navegador cargue inicie la funcion init
var Vurl = "http://localhost:3000/empleados/set";

function init() {
    document.querySelector('#ModificarEmpleado').addEventListener('click', Modificar);
}

function Modificar() {
    var ContenidoExistente = document.getElementById("ContenidoInput");
    ContenidoExistente.style.display = 'none';
    var Res = document.getElementById("Resultado");

    var EmpleadoIDH = document.getElementById('id').value;
    var nombreH = document.getElementById('input-nombre').value;
    var apellidoH = document.getElementById('input-apellido').value;
    var telefonoH = document.getElementById('input-telefono').value;
    var correoH = document.getElementById('input-correo').value;
    var direccionH = document.getElementById('input-direccion').value;

    axios({
        method: 'post',
        url: Vurl,
        data: {
            empleadoID: EmpleadoIDH,
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
                "Usuario modificado correctamente");
            Res.appendChild(texto);
        }
        else {
            var texto = document.createTextNode(
                "No se encontró ningún usuario con ese ID");
            Res.appendChild(texto);
        }
    }).catch(function (err) {
        if (EmpleadoIDH == "" || nombreH == "" || apellidoH == "" || telefonoH == "" || correoH == "" || direccionH == "") {
            var textoSinUsuario = document.createTextNode("No llenaste correctamente todos los campos");
            Res.appendChild(textoSinUsuario);
        }
        else {
            var TextoError = document.createTextNode("Error con el servidor");
            Res.appendChild(TextoError);
        }
    })

}