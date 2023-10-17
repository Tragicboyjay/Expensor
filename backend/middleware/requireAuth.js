const jwt = require('jsonwebtoken')
const User = require('../userModel')

const requireAuth = async (req, res, next) => {
    // verify authorization
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Auth token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET_STRING)

        req.user = await  User.findOne({_id}).select('_id')

        next()

    }catch(error){
        console.log(error)
        res.status(401).json({error: 'request is not verified'})
    }


}

module.exports = requireAuth