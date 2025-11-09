import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/api';

export default function Dashboard({ setCurrentView, setSelectedOrder }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadOrders();
  }, []);
  
  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      // Usar datos de ejemplo si falla
      setOrders([
        {
          id: "0891",
          client: "María González",
          product: "Panel decorativo",
          material: "MDF 15mm",
          dimensions: "120 x 80 cm",
          status: "completed"
        },
        {
          id: "0892",
          client: "Carlos Ruiz",
          product: "Puerta de closet",
          material: "MDF 18mm",
          dimensions: "200 x 60 cm",
          status: "in_progress",
          progress: 65
        },
        {
          id: "0893",
          client: "Ana Martínez",
          product: "Estantería modular",
          material: "MDF 12mm",
          dimensions: "150 x 40 cm",
          status: "pending"
        },
        {
          id: "0894",
          client: "Pedro Silva",
          product: "Mesa auxiliar",
          material: "MDF 20mm",
          dimensions: "80 x 80 cm",
          status: "pending"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const stats = [
    { label: "Pedidos Hoy", value: "4", trend: "↑ +2 vs ayer" },
    { label: "En Proceso", value: "1", trend: "Corte activo" },
    { label: "Completados", value: "2", trend: "↑ 100%" },
    { label: "Eficiencia", value: "94%", trend: "↑ +3%" }
  ];
  
  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: "Completado", class: "bg-green-100 text-green-800" },
      in_progress: { text: "En proceso", class: "bg-blue-100 text-blue-800" },
      pending: { text: "Pendiente", class: "bg-yellow-100 text-yellow-800" }
    };
    return badges[status];
  };
  
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setCurrentView('order-detail');
    navigate(`/order/${order.id}`);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Cargando pedidos...</div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Hoy tienes {orders.length} pedidos asignados</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover-scale">
            <div className="text-xs font-semibold text-gray-600 uppercase mb-2">{stat.label}</div>
            <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs text-green-600">{stat.trend}</div>
          </div>
        ))}
      </div>
      
      {/* Orders Table */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b-2 border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Pedidos de Hoy</h3>
          <button className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            🔽 Filtrar por estado
          </button>
        </div>
        
        <div>
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase">
            <div>ID</div>
            <div>Cliente / Producto</div>
            <div>Material</div>
            <div>Dimensiones</div>
            <div>Estado</div>
            <div>Acción</div>
          </div>
          
          {/* Rows */}
          {orders.map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <div key={order.id} className="grid grid-cols-6 gap-4 px-6 py-5 border-b border-gray-200 items-center hover:bg-gray-50 cursor-pointer">
                <div className="font-bold text-purple-600">#{order.id}</div>
                <div>
                  <div className="font-semibold text-gray-900">{order.client}</div>
                  <div className="text-sm text-gray-600">{order.product}</div>
                </div>
                <div className="text-gray-700">{order.material}</div>
                <div className="text-gray-700">{order.dimensions}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.class}`}>
                    {badge.text}
                  </span>
                </div>
                <div>
                  <button 
                    onClick={() => handleOrderClick(order)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700"
                  >
                    {order.status === 'in_progress' ? 'Monitor' : order.status === 'completed' ? 'Ver' : 'Iniciar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
