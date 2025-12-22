import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Nuevo estado para saber qué código se copió recientemente (para el efecto visual)
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        const userStored = localStorage.getItem('user');
        if (!userStored) {
            navigate('/login');
        } else {
            const user = JSON.parse(userStored);
            setCurrentUser(user);
            fetchGroups(user.token);
        }
    }, [navigate]);

    const fetchGroups = async (token) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/groups`, config);
            setGroups(response.data);
        } catch (error) {
            console.error("Error cargando grupos", error);
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/groups`, { name: newGroupName }, config);

            setGroups([...groups, response.data]);
            setNewGroupName('');
            setShowCreateForm(false);
        } catch (error) {
            alert("Error creando grupo");
        }
    };

    const handleJoinGroup = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/groups/join`, { code: joinCode.toUpperCase() }, config);

            setGroups([...groups, response.data]);
            setJoinCode('');
            alert("¡Te uniste al grupo!");
        } catch (error) {
            alert(error.response?.data?.message || "Código inválido");
        }
    };

    // --- 📋 NUEVA FUNCIÓN DE COPIAR ---
    const copyToClipboard = (e, code, groupId) => {
        e.stopPropagation(); // Evita que al hacer clic en copiar, entres al grupo
        navigator.clipboard.writeText(code);

        // Activamos el estado "copiado" para este ID
        setCopiedId(groupId);

        // A los 2 segundos, volvemos el ícono a la normalidad
        setTimeout(() => {
            setCopiedId(null);
        }, 2000);
    };

    const enterGroup = (group) => {
        navigate(`/chat/${group._id}`, { state: { groupData: group } });
    };

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-blue-500">Mis Grupos 🌎</h1>
                <div className="flex gap-4 items-center">
                    <span className="text-gray-400 text-sm hidden md:block">Hola, {currentUser?.name}</span>
                    <button onClick={logout} className="text-red-400 hover:text-red-300 text-sm border border-red-900/50 bg-red-900/20 px-3 py-1 rounded">Salir</button>
                </div>
            </div>

            {/* GRID DE GRUPOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {groups.map(group => (
                    <div
                        key={group._id}
                        onClick={() => enterGroup(group)}
                        className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 cursor-pointer transition shadow-lg hover:shadow-blue-900/20 group relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-200 group-hover:text-white truncate pr-2">{group.name}</h3>
                            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-400 font-mono border border-gray-600 flex-shrink-0">
                                {group.members.length} 👤
                            </span>
                        </div>

                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Código de invitación:</p>

                        {/* --- ZONA DEL CÓDIGO CON BOTÓN --- */}
                        <div className="bg-gray-900 rounded-lg p-2 flex justify-between items-center border border-gray-700 group-hover:border-gray-600 transition">
                            <span className="text-xl font-mono text-blue-400 font-bold tracking-widest pl-2">
                                {group.code}
                            </span>

                            <button
                                onClick={(e) => copyToClipboard(e, group.code, group._id)}
                                className={`p-2 rounded-md transition-all duration-200 ${copiedId === group._id
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                                    }`}
                                title="Copiar código"
                            >
                                {copiedId === group._id ? (
                                    // Ícono de Check (Copiado)
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                ) : (
                                    // Ícono de Copiar (Papeles)
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                ))}

                {/* BOTÓN CREAR NUEVO */}
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="border-2 border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:text-blue-400 hover:border-blue-500/50 transition h-40 group"
                >
                    <span className="text-4xl mb-2 group-hover:scale-110 transition">+</span>
                    <span className="font-semibold">Crear Nuevo Grupo</span>
                </button>
            </div>

            {/* FORMULARIOS */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Crear */}
                {showCreateForm && (
                    <div className="bg-gray-800 p-6 rounded-xl animate-fade-in-down shadow-xl border border-gray-700">
                        <h3 className="text-lg font-bold mb-4 text-blue-400">Crear Grupo Nuevo</h3>
                        <form onSubmit={handleCreateGroup} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Ej: Casa Playa"
                                value={newGroupName}
                                onChange={e => setNewGroupName(e.target.value)}
                                className="flex-1 bg-gray-900 rounded-lg p-3 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                                required
                            />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg text-white font-bold transition">Crear</button>
                        </form>
                    </div>
                )}

                {/* Unirse */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
                    <h3 className="text-lg font-bold mb-4 text-green-400">¿Tienes un código?</h3>
                    <form onSubmit={handleJoinGroup} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="CÓDIGO (Ej: A1B2C3)"
                            value={joinCode}
                            onChange={e => setJoinCode(e.target.value)}
                            className="flex-1 bg-gray-900 rounded-lg p-3 text-white border border-gray-600 focus:outline-none focus:border-green-500 uppercase font-mono placeholder:normal-case tracking-wider"
                            maxLength={6}
                            required
                        />
                        <button type="submit" className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg text-white font-bold transition">Unirme</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;