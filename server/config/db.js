// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Intentamos conectar usando la variable de entorno (que crearemos luego)
        await mongoose.connect(process.env.MONGO_URI);

        console.log('✅ MongoDB Conectado: Base de datos de Amedias lista');
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Si falla, apagamos el servidor para no trabajar en el aire
    }
};

module.exports = connectDB;