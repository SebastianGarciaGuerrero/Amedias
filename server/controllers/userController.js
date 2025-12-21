// server/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validar que vengan todos los datos
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Por favor completa todos los campos' });
        }

        // 2. Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // 3. Encriptar la contraseña (HASH)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Crear el usuario en la BD
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 5. Responder al cliente (Si todo salió bien)
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id) // Le damos su "carnet" digital de inmediato
            });
        } else {
            res.status(400).json({ message: 'Datos de usuario inválidos' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// @desc    Autenticar usuario (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar por email
        const user = await User.findOne({ email });

        // 2. Comparar la contraseña escrita con la encriptada
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}

// Función auxiliar para generar el JWT (El carnet de identidad)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // El login dura 30 días
    });
};

module.exports = {
    registerUser,
    loginUser
};