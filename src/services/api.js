import axios from 'axios';

// Configuración base de Axios
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para agregar token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== ÓRDENES/PEDIDOS =====
export const getOrders = async () => {
  const response = await api.get('/api/orders');
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await api.get(`/api/orders/${orderId}`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/api/orders', orderData);
  return response.data;
};

export const updateOrder = async (orderId, orderData) => {
  const response = await api.put(`/api/orders/${orderId}`, orderData);
  return response.data;
};

// ===== NEL - CHAT CON IA =====
export const sendMessageToNEL = async (message, orderId) => {
  const response = await api.post('/api/nel/chat', {
    message,
    orderId,
  });
  return response.data;
};

export const analyzeDesignFile = async (fileData, orderId) => {
  const response = await api.post('/api/nel/analyze', {
    file: fileData,
    orderId,
  });
  return response.data;
};

export const getProductionParameters = async (orderId) => {
  const response = await api.get(`/api/nel/parameters/${orderId}`);
  return response.data;
};

// ===== INVENTARIO =====
export const getInventory = async () => {
  const response = await api.get('/api/inventory');
  return response.data;
};

export const updateInventoryItem = async (itemId, quantity) => {
  const response = await api.put(`/api/inventory/${itemId}`, { quantity });
  return response.data;
};

export const getInventoryAlerts = async () => {
  const response = await api.get('/api/inventory/alerts');
  return response.data;
};

// ===== MONITOREO EN TIEMPO REAL =====
export const getProductionStatus = async (orderId) => {
  const response = await api.get(`/api/production/status/${orderId}`);
  return response.data;
};

export const startProduction = async (orderId) => {
  const response = await api.post(`/api/production/start`, { orderId });
  return response.data;
};

export const stopProduction = async (orderId) => {
  const response = await api.post(`/api/production/stop`, { orderId });
  return response.data;
};

// ===== CONTROL DE CALIDAD =====
export const submitQualityCheck = async (orderId, checklistData) => {
  const response = await api.post(`/api/quality/check`, {
    orderId,
    ...checklistData,
  });
  return response.data;
};

export const getQualityReport = async (orderId) => {
  const response = await api.get(`/api/quality/report/${orderId}`);
  return response.data;
};

// ===== FACTURACIÓN =====
export const generateInvoice = async (orderId) => {
  const response = await api.post(`/api/invoices/generate`, { orderId });
  return response.data;
};

export const getInvoice = async (invoiceId) => {
  const response = await api.get(`/api/invoices/${invoiceId}`);
  return response.data;
};

export const sendInvoiceToClient = async (invoiceId, email) => {
  const response = await api.post(`/api/invoices/send`, {
    invoiceId,
    email,
  });
  return response.data;
};

// ===== USUARIO/AUTENTICACIÓN =====
export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

export default api;
