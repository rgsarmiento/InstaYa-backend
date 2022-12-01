const router = require('express').Router()//administra rutas
const User = require('../models/user')//modelo usuario
const Joi = require('@hapi/joi')//validador de datos
const bcrypt = require('bcryptjs')//encrypta
const jwt = require('jsonwebtoken')//crea el token

// Esquema del registro validacion
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

// Esquema del login validacion
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

//RUTA LOGIN
router.post('/login', async (req, res) => {
    // Validaciones de login
    const { error } = schemaLogin.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})
    
    // Validacion de existencia del emsil
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({error: 'Usuario no encontrado'})

    // Validacion de password en la base de datos
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json({error: 'Contraseña incorrecta'})

    // Creando token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET, {
        expiresIn: 86400 // 24 horas
      })
    
    const userlogin=user.name;
    // Colocando el token en el header y el cuerpo de la respuesta
    res.header('auth-token', token).json({
        error: null,
        data: { token },
        message: `Bienvenido ${userlogin}`
    })
})


//RUTA REGISTRAR
router.post('/register', async (req, res) => {

    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }
    // VERIFICA SI EXISTE EMAIL
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado...'}
        )
    }
    // ENCRYPTAR CONTRASEÑA
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    // GUARDAR REGISTRO
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });
    try {
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})
//EXPORTAR RUTAS
module.exports = router;