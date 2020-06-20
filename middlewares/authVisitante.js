module.exports = (req, res, next) => {
    const { authVisitante } = req.session;

    if (!authVisitante) {
        return res.redirect("/");
    }

    res.locals.authVisitante = authVisitante;
    return next();
};
