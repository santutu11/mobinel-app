import { useState, useEffect, useRef } from 'react';
import { sendMessageToNEL, getNELHistory } from '../services/api';

export default function NELInterface({ order }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const currentOrder = order || {
    id: "0892",
    client: "Carlos Ruiz",
    product: "Puerta de closet",
    material: "MDF 18mm",
    dimensions: "200 x 60 cm"
  };
  
  useEffect(() => {
    // Initial NEL greeting
    setMessages([{
      role: 'assistant',
      content: `¡Hola! Soy NEL, tu asistente de producción inteligente. Estoy aquí para ayudarte con el pedido #${currentOrder.id}. ¿En qué puedo asistirte?`,
      timestamp: new Date().toISOString()
    }]);
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await sendMessageToNEL(input.trim(), currentOrder.id);
      
      const nelMessage = {
        role: 'assistant',
        content: response.respuesta,
        timestamp: response.timestamp
      };
      
      setMessages(prev => [...prev, nelMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      <div className="gradient-purple rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h2 className="text-2xl font-bold">NEL</h2>
            <p className="text-sm opacity-90">Asistente de Producción IA</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-lg px-4 py-2 inline-flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></div>
          Conectado con Claude AI
        </div>
      </div>
      
      <div className="flex-1 bg-white border-2 border-gray-200 rounded-xl overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-80 bg-gray-50 border-r-2 border-gray-200 p-6">
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-600 uppercase mb-3">Pedido Actual</div>
            <div className="space-y-2">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">ID del Pedido</div>
                <div className="font-semibold text-gray-900">#{currentOrder.id}</div>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">Cliente</div>
                <div className="font-semibold text-gray-900">{currentOrder.client}</div>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">Material</div>
                <div className="font-semibold text-gray-900">{currentOrder.material}</div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-xs font-semibold text-gray-600 uppercase mb-3">Capacidades de NEL</div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Optimización de parámetros CNC</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Cálculo de materiales</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Sugerencias de acabados</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Estimación de tiempos</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Conversación con NEL</h3>
            <p className="text-sm text-gray-600 mt-1">Pregúntame sobre materiales, tiempos o procesos</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${msg.role === 'assistant' ? 'gradient-purple text-white' : 'bg-gray-200 text-gray-900'}`}>
                  {msg.role === 'assistant' ? 'N' : 'AR'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm text-gray-900">
                      {msg.role === 'assistant' ? 'NEL' : 'Anthony Ramírez'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className={`rounded-xl p-4 ${msg.role === 'assistant' ? 'bg-gray-50' : 'bg-purple-50'}`}>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center text-white font-semibold flex-shrink-0">
                  N
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-6 border-t-2 border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta o comando para NEL..."
                disabled={loading}
                className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '...' : 'Enviar →'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Presiona Enter para enviar • Shift+Enter para nueva línea
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
