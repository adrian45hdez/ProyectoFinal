window.onload = init;//Le decimos que cunado el navegador cargue inicie la funcion init
var Vurl = "http://localhost:3000/user/login";

function init() {
    document.querySelector('#btn-primary').addEventListener('click', login);
}

function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: Vurl,
        data: {
            user_mail: mail,
            user_password: pass
        }

    }).then(function (res) {
        console.log(res.data);
        if (res.data.code === 200) {
            localStorage.setItem("token", res.data.message);
            window.location.href = "../Principal/Principal.html"


        }
        else {
            alert("Usuario y/o Contraseña erroneos");
        }
    }).catch(function (err) {
        console.log(err);
        alert("Error");
    })
}