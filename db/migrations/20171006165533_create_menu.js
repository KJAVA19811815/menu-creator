exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("menus", function(table) {
      table.increments().primary();
      table.foreign("user_id").references("user_id");
      table.string("name");
      table.string("image");
      table.decimal("price");
      table.string("description");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("menus")]);
};
