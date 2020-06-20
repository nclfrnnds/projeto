module.exports = (req, res, next) => {
    const { authAdmin } = req.session;

    if (!authAdmin) {
        return res.redirect("/");
    }

    res.locals.authAdmin = authAdmin;
    return next();
};
