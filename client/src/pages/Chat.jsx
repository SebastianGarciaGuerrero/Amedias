import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // <--- Hooks Nuevos

const Chat = () => {
    const navigate = useNavigate();
    const { groupId } = useParams(); // <--- Obtenemos el ID de la URL
    const location = useLocation();  // <--- Obtenemos el nombre/código que mandamos desde el Dashboard
    const groupData = location.state?.groupData; // Datos del grupo (Nombre, código)

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [balance, setBalance] = useState({ myTotal: 0, groupTotal: 0, debt: 0 });

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const userStored = localStorage.getItem('user');
        if (!userStored) {
            navigate('/login');
        } else {
            setCurrentUser(JSON.parse(userStored));
            // Verificamos si hay groupId, si no, volvemos al dashboard
            if (!groupId) navigate('/dashboard');

            fetchMessages(JSON.parse(userStored).token); // Pasamos token directo
        }
    }, [navigate, groupId]);

    useEffect(() => {
        if (currentUser && messages.length > 0) {
            calculateBalance();
        }
        scrollToBottom();
    }, [messages, currentUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async (token) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            // AQUI CAMBIA: Pedimos mensajes DEL GRUPO específico
            const response = await axios.get(`http://localhost:4000/api/messages/${groupId}`, config);
            setMessages(response.data);
        } catch (error) {
            console.error("Error cargando mensajes", error);
        }
    };

    // ... (La función calculateBalance queda IGUAL, no la toques) ...
    const calculateBalance = () => {
        // ... (Tu lógica matemática que ya tenías)
        // COPIA TU FUNCIÓN calculateBalance AQUÍ IGUAL QUE ANTES
        let myTotal = 0;
        let groupTotal = 0;

        messages.forEach(msg => {
            const costo = msg.amount || 0;
            const soyYo = msg.sender._id === currentUser._id;

            if (msg.isPayment) {
                if (soyYo) myTotal += costo;
                else myTotal -= costo;
            } else {
                groupTotal += costo;
                if (soyYo) myTotal += costo;
            }
        });

        const fairShare = groupTotal / 2;
        const debt = fairShare - myTotal;

        setBalance({ myTotal, groupTotal, debt });
    };

    const handleSend = async (e, isPayment = false) => {
        if (e) e.preventDefault();
        if (isPayment && (!amount || amount <= 0)) {
            alert("Para registrar un pago debes poner un monto");
            return;
        }
        if (!isPayment && !text.trim()) return;

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = { headers: { Authorization: `Bearer ${user.token}` } };

            const finalText = isPayment ? `💸 Realizó un pago de deuda` : text;

            const response = await axios.post('http://localhost:4000/api/messages', {
                text: finalText,
                amount: amount || 0,
                isPayment: isPayment,
                groupId: groupId // <--- IMPORTANTE: Ahora enviamos el ID del grupo
            }, config);

            setMessages([...messages, response.data]);
            setText('');
            setAmount('');
        } catch (error) {
            console.error("Error enviando mensaje", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Volver al Dashboard
    const goBack = () => navigate('/dashboard');

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* HEADER MEJORADO */}
            <div className="bg-gray-800 p-4 shadow-md flex flex-col gap-2 z-20">
                <div className="flex justify-between items-center w-full">
                    <button onClick={goBack} className="text-gray-400 hover:text-white mr-2 text-xl">
                        ⬅
                    </button>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-blue-500 leading-none">
                            {groupData?.name || 'Grupo'}
                        </h1>
                        <p className="text-[10px] text-gray-500 font-mono tracking-wider">
                            CÓDIGO: {groupData?.code}
                        </p>
                    </div>
                    <button onClick={logout} className="text-xs bg-red-600/80 hover:bg-red-600 px-2 py-1 rounded transition ml-1">
                        Salir
                    </button>
                </div>

                {/* TARJETA DE RESUMEN (Aquí va el mismo código de antes) */}
                <div className="bg-gray-700 rounded-lg p-2 flex justify-around items-center text-sm border border-gray-600 shadow-inner w-full">
                    {/* ... (Pega aquí la tarjeta de resumen que ya tenías) ... */}
                    <div className="text-center">
                        <p className="text-gray-400 text-[10px]">Total</p>
                        <p className="font-bold text-white text-xs">
                            {balance.groupTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                        </p>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-600"></div>
                    <div className="text-center">
                        <p className="text-gray-400 text-[10px]">{balance.debt > 0 ? "Debes" : "Te deben"}</p>
                        <p className={`font-bold text-sm ${balance.debt > 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {Math.abs(balance.debt).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                        </p>
                    </div>
                    {balance.debt > 0 && (
                        <button onClick={() => handleSend(null, true)} className="ml-2 bg-green-600 text-[10px] font-bold px-2 py-1 rounded animate-pulse">
                            Pagar
                        </button>
                    )}
                </div>
            </div>

            {/* CHAT (Igual que antes) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                {/* ... (Tu código de renderizado de mensajes .map() VA AQUÍ) ... */}
                {messages.map((msg) => {
                    const isMe = msg.sender._id === currentUser?._id;
                    const isPayment = msg.isPayment;
                    return (
                        <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            {/* ... Pega el interior de tus burbujas de chat aquí ... */}
                            <div className={`max-w-[85%] p-3 rounded-2xl shadow-md ${isPayment
                                    ? 'bg-yellow-600/20 border border-yellow-500 text-yellow-100'
                                    : (isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none')
                                }`}>
                                <p className={`text-sm ${isPayment ? 'font-bold italic' : ''}`}>{msg.text}</p>
                                {msg.amount > 0 && (
                                    <div className="mt-1 text-xs font-mono opacity-80">
                                        {isPayment ? '🤝' : '💵'} ${msg.amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                    </div>
                                )}
                                <p className="text-[9px] mt-1 text-right opacity-50">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* INPUTS (Igual que antes) */}
            <form onSubmit={(e) => handleSend(e, false)} className="bg-gray-800 p-3 border-t border-gray-700 flex gap-2">
                {/* ... Tu formulario de input ... */}
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="$0" className="w-20 p-2 rounded bg-gray-700 text-white" />
                <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="..." className="flex-1 p-2 rounded bg-gray-700 text-white" />
                <button type="submit" className="bg-blue-600 p-2 rounded text-white">➤</button>
            </form>
        </div>
    );
};

export default Chat;