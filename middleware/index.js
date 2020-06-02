module.exports = (req, res, next) => {
    return res.status(200).json({ code: 1, message: "Bienvenido al sistema de la empresa Taller de Node.js S.A de C.V ®" });
}