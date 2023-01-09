const knex = require('../database/knex')
const AppError = require("../utils/AppError");
const {hash, compare} = require('bcrypt')

class UserController{
  async create(req, res){
    const { email, name, password } = req.body
    
    if(!name || !email || !password ){
      throw new AppError('Nome/Email são obrigatórios')       
    }
    
    const checkIfEmailExists = await knex('users').select('*').where({ email }).first()

    if(checkIfEmailExists){
      throw new AppError('Esse email já está cadastrado')
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword
    })


   return res.status(201).json('Usuário cadastrado com sucesso!')
  }

  async updated(req, res){
    const { email, name, password, old_password } = req.body
    const  user_id  = req.user.id
    
    const user = await knex('users').select('*').where({ id: user_id }).first()

    if(!user){
      throw new AppError('Usuário não encontrado')
    }

    const emailToUpdate = await knex('users').select('*').where({email}).first()

    if(emailToUpdate && emailToUpdate.id !== user_id){
      throw new AppError('Esse email já está em uso')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password) throw new AppError('Digite a senha antiga.')

    if(password && old_password){
      const checkIfPasswordMatch = compare(user.password, old_password)

      if(!checkIfPasswordMatch) throw new AppError('Senha antiga não conferefe')

      user.password = await hash(password, 8)

    }

    await knex('users')
    .select('*')
    .update({
      'name': name,
      'email': email,
      'password': user.password,
      'updated_at': knex.fn.now()  
    }).where({id: user_id})


   return res.status(200).json({user , status: 'Usuário atualizado com sucesso!'})
  }
  
  async show(req, res){
    const user_id = req.user.id

    const user = await knex('users').where({id: user_id})
    return res.json(user)
  }
}

module.exports = UserController