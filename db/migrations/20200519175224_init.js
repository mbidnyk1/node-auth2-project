
exports.up = function(knex) {
  return (
    knex.schema
        // roles
        .createTable("roles", tbl => {
        tbl.increments();

        tbl.string("name", 128).notNullable().unique();
        })

        // users
        .createTable("users", tbl => {
        tbl.increments();

        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("password", 256).notNullable();

        tbl
            .integer("role")
            .unsigned()
            .references("roles.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        })
    );    
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
