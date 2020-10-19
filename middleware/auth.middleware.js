const config = require('config')
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        console.log('next')
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if(!token) {
            return res.status(401).json({ message: 'Not a authorizaton'})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        console.log(req)
        next()
    } catch (e) {
        res.status(401).json({ message: 'Not a authorizaton'})
    }
}