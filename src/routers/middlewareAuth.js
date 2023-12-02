const jwtService = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const routeUser = req.path
    const nonSecurityRoutesUsers = ['/user/create', '/user/login']
    if(nonSecurityRoutesUsers.includes(routeUser)) {
        return next()
    }

    const token = req.headers.authorization
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({message: "Usuário não autorizado."})
    }

    const tokenValue = token.split(' ')[1]
    const secret = process.env.SECRET
    try {
        await jwtService.verify(tokenValue, secret)
        return next()
    }catch (err) {
        return res.status(401).json({message: "Não foi possível autorizar."})
    }
}