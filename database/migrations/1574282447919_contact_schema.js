'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactSchema extends Schema {
 
up () {
    this.create('contacts', (table) => {
      
      
      table
      .integer('affiliate_id')
      .unsigned()
      .references('id')
      .inTable('affiliates')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table.string('name' , 255)
      table.string('email' , 255)
      table.string('phone' , 20)
      table.string('whatsapp' , 20)
      table.string('telegram' , 20)
      table.string('sms' , 20)
      
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('contacts')
  }
}

module.exports = ContactSchema
