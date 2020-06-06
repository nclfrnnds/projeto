module.exports = (req, res, next) => {
    const { usuario } = req.session;

    if (!usuario) {
        return res.redirect("/login");
    }

    res.locals.usuario = usuario;
    return next();
};

/*
module.exports = (req, res, next) => {
    // user not logged in
    if (!req.session.user) res.redirect("/login");
    // user has a session
    next();
}

module.exports = (req, res, next) => {
    if (!req.session.user) res.redirect("/login");
    res.locals.user = req.session.user;
    next();
*/