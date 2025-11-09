import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OrderDetail from './components/OrderDetail';
import NELInterface from './components/NELInterface';
import RealtimeMonitor from './components/RealtimeMonitor';
import QualityControl from './components/QualityControl';
import Inventory from './components/Inventory';
import Invoice from './components/Invoice';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [user, setUser] = useState({
    name: 'Anthony Ramírez',
    role: 'Técnico CNC',
    initials: 'AR'
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} currentView={currentView} />
        
        <div className="flex">
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
          
          <main className="flex-1 p-8">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard setCurrentView={setCurrentView} setSelectedOrder={setSelectedOrder} />} 
              />
              <Route 
                path="/dashboard" 
                element={<Dashboard setCurrentView={setCurrentView} setSelectedOrder={setSelectedOrder} />} 
              />
              <Route 
                path="/order/:orderId" 
                element={<OrderDetail order={selectedOrder} setCurrentView={setCurrentView} />} 
              />
              <Route 
                path="/nel" 
                element={<NELInterface order={selectedOrder} />} 
              />
              <Route 
                path="/monitor" 
                element={<RealtimeMonitor order={selectedOrder} />} 
              />
              <Route 
                path="/quality" 
                element={<QualityControl order={selectedOrder} setCurrentView={setCurrentView} />} 
              />
              <Route 
                path="/inventory" 
                element={<Inventory />} 
              />
              <Route 
                path="/invoice/:orderId" 
                element={<Invoice order={selectedOrder} />} 
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
