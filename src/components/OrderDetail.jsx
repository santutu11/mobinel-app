import { useNavigate } from 'react-router-dom';

export default function OrderDetail({ order, setCurrentView }) {
  const navigate = useNavigate();
  const currentOrder = order || {
    id: "0892",
    client: "Carlos Ruiz",
    product: "Puerta de closet",
    material: "MDF 18mm",
    dimensions: "200 x 60 cm"
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-4">Dashboard / Pedidos / #{currentOrder.id}</div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Pedido #{currentOrder.id}</h2>
            <p className="text-gray-600 mt-1">Cliente: {currentOrder.client} - {currentOrder.product}</p>
          </div>
          <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-100 text-blue-800">
            En Proceso
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificaciones Técnicas</h3>
            <div className="space-y-3">
              {[
                ['Material', currentOrder.material],
                ['Dimensiones', currentOrder.dimensions],
                ['Acabado', 'Barniz mate'],
                ['Color', 'Blanco nieve'],
                ['Tipo de corte', 'CNC de precisión'],
                ['Tiempo estimado', '3.5 horas']
              ].map(([label, value], idx) => (
                <div key={idx} className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="space-y-3">
            <button 
              onClick={() => { setCurrentView('nel'); navigate('/nel'); }}
              className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              🚀 Iniciar con NEL
            </button>
            <button className="w-full bg-white border-2 border-gray-200 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50">
              💬 Contactar cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
