const Message = require('../models/Message');

// @desc    Obtener mensajes DE UN GRUPO ESPECÍFICO
// @route   GET /api/messages/:groupId
const getMessages = async (req, res) => {
    const { groupId } = req.params;

    // Buscamos mensajes que tengan ese groupId
    const messages = await Message.find({ group: groupId }).populate('sender', 'name email');
    res.status(200).json(messages);
};

// @desc    Enviar mensaje A UN GRUPO
// @route   POST /api/messages
const sendMessage = async (req, res) => {
    const { text, amount, isPayment, groupId } = req.body; // <-- Ahora recibimos groupId

    if (!text || !groupId) {
        return res.status(400).json({ message: 'Faltan datos (texto o grupo)' });
    }

    const message = await Message.create({
        text,
        amount: amount || 0,
        isPayment: isPayment || false,
        sender: req.user.id,
        group: groupId // <-- Guardamos la referencia
    });

    const fullMessage = await Message.findById(message._id).populate('sender', 'name');

    res.status(200).json(fullMessage);
};

module.exports = { getMessages, sendMessage };