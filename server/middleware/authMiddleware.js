// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Verificar si hay un token en el encabezado (Header) "Authorization"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // El token viene como: "Bearer eyJhbGciOi..." -> Quitamos la palabra "Bearer"
            token = req.headers.authorization.split(' ')[1];

            // Decodificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscamos al usuario por el ID que venía en el token y lo guardamos en req.user
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Dejamos pasar a la siguiente función
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

module.exports = { protect };