const express = require('express');
const empleado = express.Router();
const db = require('../config/database');

empleado.post("/push", async (req, res, next) => {//Inserta empleados
    const { nombre,apellido,telefono,correo,direccion } = req.body;

    if (nombre && apellido && telefono && correo && direccion) {
        let query = "INSERT INTO empleado(nombre, apellido, telefono, correo, direccion)";
        query += ` VALUES('${nombre}','${apellido}','${telefono}','${correo}','${direccion}')`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "empleado insertado correctamente " });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })

});

empleado.post("/delete", async (req, res, next) => {//Elimina empleados
    const { empleadoID } = req.body;
    const query = `DELETE FROM empleado WHERE empleadoID='${empleadoID}'`;
    const rows = await db.query(query);

    if (empleadoID) {
        console.log("1");
        if (rows.affectedRows == 1) {
            console.log("2");
            return res.status(200).json({ code: 200, message: "empleado borrado correctamente" });
        }
        console.log("3");
        return res.status(200).json({ code: 404, message: "empleado no encontrado" });
    }
    console.log("4");
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

empleado.post("/set", async (req, res, next) => {//Modifica un empleado
    const { nombre, apellido, telefono, correo, direccion, empleadoID } = req.body;

    if (nombre && apellido && telefono && correo && direccion) {
        let query = `UPDATE empleado SET nombre = '${nombre}', apellido ='${apellido}',`;
        query += `telefono = '${telefono}', correo = '${correo}', direccion = '${direccion}' WHERE empleadoID='${empleadoID}'`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "empleado actualizado correctamente " });
        }
        return res.status(200).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
})

empleado.post('/get', async (req, res, next) => {//Conusulta empleados por su nombre
    const { name, apellido } = req.body;
    
    if (name && apellido) {
        const pk = await db.query("SELECT * FROM empleado WHERE nombre = '" + name.toLowerCase() + "' AND apellido ='" + apellido.toLowerCase() + "'");
        //If terniario
        (pk.length > 0) ? res.status(200).json({ code: 200, message: pk }) : res.status(200).send({ code: 401, message: "Usuario no encontrado" });
    }
    else {
        res.status(404).json({ code: 404, message: "No has ingresado todos los campos" });
    }
});

module.exports = empleado;//Solo nos permite exportar una sola cosa. 