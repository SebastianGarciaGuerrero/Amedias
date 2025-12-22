import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Hacemos la petición al servidor (Asegúrate que el puerto 4000 sea el correcto)
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, formData);

            // 2. Si todo sale bien, guardamos el "Carnet" (Token) en el navegador
            // Esto soluciona tu problema de que "se pierden los datos al recargar"
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                alert("¡Registro Exitoso! Bienvenido a Amedias");
                navigate('/dashboard'); // Lo mandamos directo al chat
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Error al registrarse");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                <h1 className="text-3xl font-bold text-center mb-2 text-blue-500">Amedias</h1>
                <p className="text-center text-gray-400 mb-8">Crea tu cuenta para compartir gastos</p>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Nombre completo"
                        onChange={onChange}
                        className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Correo electrónico"
                        onChange={onChange}
                        className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Contraseña"
                        onChange={onChange}
                        className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                        required
                    />

                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition duration-300 mt-2">
                        Registrarse
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-blue-400 hover:underline">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;