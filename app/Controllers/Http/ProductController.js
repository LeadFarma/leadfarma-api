'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Product = use('App/Models/Product')
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    const products = await Product.all()
    const count = await Product.getCount()

    const params = request.only(["page" , "per_page"])

    console.log(params);
    
    const data = {
      items: products,
      page: params.page,
      per_page : params.per_page,
      total:count
    }

    return data;

  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const data = request.only([
      'name',
      'description',
      'short_description',
      'ean_13'
    ])

    const validationOptions = {
      types: ['image'],
      size: '5mb',
      extnames: ['png', 'gif' , 'jpg']
    }

    const profilePic = request.file('img' , validationOptions)

    console.log('profile:pic' , profilePic,request.body);
  
    await profilePic.move(Helpers.tmpPath('uploads'), {
      name: `${data.name}.jpg`,
      overwrite: true
    })
  
    if (!profilePic.moved()) {
      return profilePic.error()
    }

    const product = await Product.create({ ...data, tenant_id:1 })

    return product
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {

    const product = await Product.findOrFail(params.id)

    await product.load('images')

    return product

  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const product = await Product.findOrFail(params.id)

    // if (product.user_id !== auth.user.id) {
    //   return response.status(401).send({ error: 'Not authorized' })
    // }

    await product.delete()

  }
}

module.exports = ProductController
