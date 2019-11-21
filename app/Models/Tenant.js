'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tenant extends Model {

Affiliates () {
    return this.hasMany('App/Models/Affiliate')
  }
}

module.exports = Tenant
