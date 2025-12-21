const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true // El código para invitar (ej: "AB123")
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Lista de usuarios que pertenecen al grupo
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Quién creó el grupo
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);