module.exports = (req, res, next) => {
    // verify login
    const loggedIn = true

    if (loggedIn) {
        req.userData = { some: "data"}
        next()
    }
    else return res.status(401).send({ error: { message: 'not authenticated' } })
}