import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard'; // <--- Importamos

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Nueva Ruta Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Ruta Chat Dinámica: Ahora espera un groupId */}
      <Route path="/chat/:groupId" element={<Chat />} />

      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;