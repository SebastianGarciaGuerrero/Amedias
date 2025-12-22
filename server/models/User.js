const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Es obligatorio tener nombre
    },
    email: {
        type: String,
        required: true,
        unique: true, // No pueden haber dos usuarios con el mismo correo
    },
    password: {
        type: String,
        required: true,
    },
    // Opcional: Podríamos agregar un campo para vincular a tu pareja en el futuro
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true // Esto agrega automáticamente fecha de creación y actualización
});

const User = mongoose.model('User', userSchema);

module.exports = User;