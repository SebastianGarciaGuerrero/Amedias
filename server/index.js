// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar a Base de Datos
connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));

app.get('/', (req, res) => {
    res.send('API de Amedias funcionando 🚀');
});

app.listen(PORT, () => {
    console.log(`\nServidor corriendo en el puerto ${PORT}`);
});