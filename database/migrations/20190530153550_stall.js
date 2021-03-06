
    exports.up = function(knex, Promise) {
        return knex.schema.createTable('stall', stall => {
            stall.increments();
            stall.json('size')
            stall
              .string('market_id')
              .unsigned()
              .notNullable()
              .references('firebase_id')
              .inTable('market')
            stall.boolean("available")
            stall.float('price')
        })
      };

      exports.down = function(knex, Promise) {
        return knex.schema.dropTableIfExists('stall')
      };
