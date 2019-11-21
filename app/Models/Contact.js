'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contact extends Model {

Tenant () {
    return this.belongsTo('App/Models/Tenant')
  }
}

module.exports = Contact
