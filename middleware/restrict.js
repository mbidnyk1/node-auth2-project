const bcrypt = require('bcryptjs')
const userModel = require('../users/users-model')
const jwt = require('jsonwebtoken')

function restrict(role  = 'user') {
    return async (req, res, next) => {
        const authError = {
            message: 'Invalid credentials'
        }
        try {
            // const token = req.headers.authorization
            const token = req.cookies.token
            if (!token) {
                return res.status(401).json(authError)
            }
            
            jwt.verify(token,process.env.JWT_SECRET, (err, decodedPayload) => {
                if (err || decodedPayload.role !== role) {
                    return res.status(401).json(authError)
                }
                req.token = decodedPayload
                next()
            })

        } catch(err) {
            next(err)
        }
    }
}

module.exports = restrict