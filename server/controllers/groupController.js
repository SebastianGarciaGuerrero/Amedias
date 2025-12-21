const Group = require('../models/Group');
const User = require('../models/User');

// @desc    Crear un grupo nuevo
// @route   POST /api/groups
const createGroup = async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'El grupo necesita un nombre' });

    // Generamos un código aleatorio de 6 caracteres (ej: 8XF2A1)
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const group = await Group.create({
        name,
        code,
        admin: req.user.id,
        members: [req.user.id] // El creador es el primer miembro
    });

    res.status(201).json(group);
};

// @desc    Unirse a un grupo con código
// @route   POST /api/groups/join
const joinGroup = async (req, res) => {
    const { code } = req.body;

    // Buscamos el grupo por su código único
    const group = await Group.findOne({ code });

    if (!group) {
        return res.status(404).json({ message: 'Código de grupo inválido' });
    }

    // Verificamos si ya estás dentro
    if (group.members.includes(req.user.id)) {
        return res.status(400).json({ message: 'Ya eres miembro de este grupo' });
    }

    // Te agregamos a la lista
    group.members.push(req.user.id);
    await group.save();

    res.status(200).json(group);
};

// @desc    Obtener mis grupos
// @route   GET /api/groups
const getMyGroups = async (req, res) => {
    // Busca grupos donde mi ID esté en la lista de 'members'
    const groups = await Group.find({ members: req.user.id });
    res.status(200).json(groups);
};

module.exports = { createGroup, joinGroup, getMyGroups };