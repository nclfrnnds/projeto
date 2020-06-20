module.exports = (req, res, next) => {
    const { authUsuario } = req.session;

    if (!authUsuario) {
        return res.redirect("/");
    }

    res.locals.authUsuario = authUsuario;
    return next();
};
