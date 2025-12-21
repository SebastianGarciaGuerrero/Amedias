const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    // --- NUEVO CAMPO ---
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true // Todo mensaje DEBE pertenecer a un grupo
    },
    // -------------------
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: { type: String, required: true },
    amount: { type: Number, default: 0 },
    isPayment: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);