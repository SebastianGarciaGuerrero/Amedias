import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Petición al endpoint de LOGIN
            const response = await axios.post('http://localhost:4000/api/users/login', formData);

            if (response.data) {
                // Guardamos el token igual que en el registro
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Credenciales inválidas");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">Iniciar Sesión</h1>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
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

                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition duration-300 mt-2">
                        Entrar
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    ¿No tienes cuenta? <Link to="/register" className="text-blue-400 hover:underline">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;