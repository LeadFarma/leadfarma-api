'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
   up () {
    this.create('products', (table) => {

      table
      .integer('tenant_id')
      .unsigned()
      .references('id')
      .inTable('tenants')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table.string('name')
      table.string('description')
      table.string('short_description')
      table.string('ean_13')
      table.string('image_url')
      
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
