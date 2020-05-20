const router = require('express').Router()
const Users = require('./users-model')
const restrict = require('../middleware/restrict')


router.get('/', restrict('admin'), async (req, res, next) => {
    try{
        const users = await Users.find()
        res.json(users)
    } catch(err) {
        next(err)
    }
})

module.exports = router