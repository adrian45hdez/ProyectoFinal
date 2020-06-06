window.onload = init;//Le decimos que cunado el navegador cargue inicie la funcion init

function init() {
    document.querySelector('#BuscarEmpleado').addEventListener('click', Buscar);
    document.querySelector('#CrearEmpleado').addEventListener('click', Crear);
    document.querySelector('#EliminarEmpleado').addEventListener('click', Eliminar);
    document.querySelector('#ModificarEmpleado').addEventListener('click', Modificar);
}

function Buscar() {
    window.location.href = "../Get/Get.html"
}

function Crear() {
    window.location.href = "../Push/Push.html"
}

function Eliminar() {
    window.location.href = "../Delete/Delete.html"
}

function Modificar() {
    window.location.href = "../Set/Set.html"
}