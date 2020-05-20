const bdcrypt = require('bcryptjs')
const db = require('../db/db-config')
module.exports = { 
    add,
    find,
    findBy,
    findById,
}
function find() {
    return db('users').select('id',' username');
}

function findBy(filter) {
    return db("users as u")
    .join("roles as r", "u.role", "r.id")
    .where(filter)
    .select("u.id", "u.username", "r.name as role", "u.password")
    .orderBy("u.id");  
}
    
async function add(user) {
        const rounds = process.env.BCRYPT_ROUNDS || 14
        user.password = await bdcrypt.hash(user.password, rounds)
        const [id] = await db("users").insert(user, "id");

        return findById(id); 
}

function findById(id) {
    return db("users").where({ id }).first('id', 'username');
}