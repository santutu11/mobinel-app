export default function Header({ user, currentView }) {
  const titles = {
    dashboard: "Dashboard",
    'order-detail': "Detalle del Pedido",
    nel: "NEL - Asistente IA",
    monitor: "Monitor en Tiempo Real",
    quality: "Control de Calidad",
    inventory: "Gestión de Inventario",
    invoice: "Facturación y Entrega"
  };

  return (
    <header className="bg-white border-b-2 border-gray-200 px-8 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 gradient-purple rounded-xl flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MOBINEL</h1>
            <p className="text-sm text-gray-600">Sistema de Producción Móvil</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-semibold text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-600">{user.role}</div>
          </div>
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user.initials}
          </div>
        </div>
      </div>
    </header>
  );
}
