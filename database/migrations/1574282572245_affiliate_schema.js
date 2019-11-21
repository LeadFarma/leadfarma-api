'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AffiliateSchema extends Schema {
  up () {
    this.create('affiliates', (table) => {
      table
        .integer('tenant_id')
        .unsigned()
        .references('id')
        .inTable('tenants')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('description' , '255')
      table.string('document' , 25)
      table.increments()
      table.timestamps()
    })
  }


  down () {
    this.drop('affiliates')
  }
}

module.exports = AffiliateSchema
