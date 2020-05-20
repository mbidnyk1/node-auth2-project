const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const restrict = require('../middleware/restrict')
const Users = require('../users/users-model')
const { isValid } = require('../users/users-service')


router.post('/register', async (req, res, next) => {
    try {
        const credentials = req.body
        if( isValid(credentials)) {
            const user = await Users.add(credentials)
            res.status(201).json(user)
        } else {
            res.status(400).json({
                message: 'Please provide a username and an alphanumeric password'
            })
        }
    } catch(err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    const authError = {
        message: 'Invalid Credentials'
    }

    try{
        const { username, password } = req.body
        const user = await Users.findBy( { username } ).first()
        if(!user) {
            return res.status(401).json(authError)
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            return res.status(401).json(authError)
        } 

        const tokenPayload = {
            userId: user.id,
            role: user.role,
        }
        
        res.cookie('token', jwt.sign(tokenPayload, process.env.JWT_SECRET))
        res.json({
            message: `Welcome ${user.username}!`,
            tokenPayload
            // token: jwt.sign(tokenPayload, process.env.JWT_SECRET)
        })
    } catch(err) {
            next(err)
        }
})

module.exports = router

