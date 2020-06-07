window.onload = init;//Le decimos que cunado el navegador cargue inicie la funcion init
var Vurl = "https://empresataller.herokuapp.com/empleados/delete";

function init() {
    document.querySelector('#EliminarEmpleado').addEventListener('click', Eliminar);
}

function Eliminar() {
    var ContenidoExistente = document.getElementById("ContenidoInput");
    ContenidoExistente.style.display = 'none';
    var Res = document.getElementById("Resultado");

    var EmpleadoID = document.getElementById('id').value;

    axios({
        method: 'post',
        url: Vurl,
        data: {
            empleadoID: EmpleadoID
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function (res) {
        if (res.data.code === 200) {
            var texto = document.createTextNode(
                "Usuario eliminado correctamente");
            Res.appendChild(texto);
        }
        else{
            var texto = document.createTextNode(
                "No se encontró ningún usuario con ese ID");
            Res.appendChild(texto);
            }
    }).catch(function (err) {
        if (EmpleadoID=="") {
            var textoSinUsuario = document.createTextNode("No llenaste correctamente todos los campos");
            Res.appendChild(textoSinUsuario);
        }
        else {
            var TextoError = document.createTextNode("Error con el servidor");
            Res.appendChild(TextoError);
        }
    })

}