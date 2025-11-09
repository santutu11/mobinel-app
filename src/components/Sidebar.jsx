import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ currentView, setCurrentView }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { id: 'order-detail', icon: '📋', label: 'Pedido Actual', path: '/order/0892' },
    { id: 'nel', icon: '🤖', label: 'Asistente NEL', path: '/nel' },
    { id: 'monitor', icon: '📈', label: 'Monitoreo', path: '/monitor' },
    { id: 'quality', icon: '✅', label: 'Calidad', path: '/quality' },
    { id: 'inventory', icon: '📦', label: 'Inventario', path: '/inventory' },
    { id: 'invoice', icon: '💰', label: 'Facturación', path: '/invoice/0892' }
  ];
  
  const handleNavigation = (item) => {
    setCurrentView(item.id);
    navigate(item.path);
  };
  
  const isActive = (path) => location.pathname.startsWith(path);
  
  return (
    <aside className="w-64 bg-white border-r-2 border-gray-200 min-h-screen p-4 sticky top-[88px] self-start">
      <nav className="space-y-2">
        {menuItems.map(item => (
          <div
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`nav-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
              isActive(item.path) ? 'active' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium text-gray-700">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
