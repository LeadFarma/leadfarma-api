'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TenantSchema extends Schema {
  
	up () 	{
   		 this.create('tenants', (table) => {
     		 table.increments()
     		 table.timestamps()
     		 table.string('name' , 255).notNullable() 
     		 table.boolean('is_active').defaultTo(true)
   	 })
  }
  down () {
    this.drop('tenants')
  }
}

module.exports = TenantSchema
