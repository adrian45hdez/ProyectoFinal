const express = require('express');
const empleado = express.Router();
const db = require('../config/database');

empleado.post("/", async (req, res, next) => {//Inserta empleados
    const { nombre,apellido,telefono,correo,direccion } = req.body;

    if (nombre && apellido && telefono && correo && direccion) {
        let query = "INSERT INTO empleado(nombre,apellido,telefono,correo,direccion)";
        query += ` VALUES('${nombre}',${apellido},${telefono},${correo},${direccion})`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "empleado insertado correctamente " });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos" })

});

empleado.delete("/:id([0-9]{1,3})", async (req, res, next) => {//Elimina empleados
    const query = `DELETE FROM empleado WHERE empleadoID=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "empleado borrado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "empleado no encontrado" });
})

empleado.put("/:id([0-9]{1,3})", async (req, res, next) => {//Modifica un empleado
    const { nombre, apellido, telefono, correo, direccion } = req.body;

    if (nombre && apellido && telefono && correo && direccion) {
        let query = `UPDATE empleado SET nombre = '${nombre}', apellido =${apellido},`;
        query += `telefono = ${telefono}, correo = ${correo}, direccion = ${direccion} WHERE empleadoID=${req.params.id};`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "empleado actualizado correctamente " });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
})

empleado.get('/:name([A-Za-z]+)', async (req, res, next) => {//Conusulta empleados por su nombre
    const name = req.params.name;
    const apellido = req.params.name;

    const pk = await db.query("SELECT * FROM empleado WHERE nombre = '" + name.toLowerCase() + "' AND apellido ='" + apellido.toLowerCase() + "'");
    //If terniario
    (pk.length > 0) ? res.status(200).json({ code: 200, message: pk }) : res.status(404).send({ code: 404, message: "Usuario no encontrado" });
});

module.exports = empleado;//Solo nos permite exportar una sola cosa. 