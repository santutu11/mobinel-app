# MOBINEL Frontend - Sistema de Producción Móvil

Aplicación web completa para el sistema MOBINEL con interfaz moderna basada en React + Vite + Tailwind CSS.

## 🚀 Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Estilos utility-first
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP para API

## 📦 Estructura del Proyecto

```
mobinel-frontend/
├── src/
│   ├── components/      # Componentes React
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── OrderDetail.jsx
│   │   ├── NELInterface.jsx
│   │   ├── RealtimeMonitor.jsx
│   │   ├── QualityControl.jsx
│   │   ├── Inventory.jsx
│   │   └── Invoice.jsx
│   ├── services/        # API services
│   │   └── api.js       # Conexión con backend
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globales
├── public/              # Assets estáticos
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## 🛠️ Instalación Local

### Requisitos Previos
- Node.js 18+ instalado
- npm o yarn
- Tu backend de MOBINEL corriendo (opcional para desarrollo)

### Pasos:

1. **Clonar o descargar el proyecto**
```bash
cd mobinel-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` y configura la URL de tu backend:
```
VITE_API_URL=http://localhost:3001
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

## 🌐 DESPLIEGUE EN GITHUB PAGES

### Opción 1: Deployment Manual

**Paso 1: Preparar el proyecto**

1. Edita `vite.config.js` y agrega la base:
```javascript
export default defineConfig({
  base: '/mobinel-app/',  // Nombre de tu repositorio
  plugins: [react()],
  // ... resto de configuración
})
```

2. Crea `.env.production`:
```
VITE_API_URL=https://tu-backend.onrender.com
```

**Paso 2: Build de producción**
```bash
npm run build
```

Esto crea la carpeta `dist/` con tu app lista para producción.

**Paso 3: Crear repositorio en GitHub**

1. Ve a github.com y crea un nuevo repositorio llamado `mobinel-app`
2. NO inicialices con README

**Paso 4: Push del código**
```bash
# En la carpeta del proyecto
git init
git add .
git commit -m "Initial commit - MOBINEL Frontend"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mobinel-app.git
git push -u origin main
```

**Paso 5: Deploy con GitHub Actions**

Crea el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

**Paso 6: Configurar GitHub Pages**

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: "GitHub Actions"
4. En Settings → Secrets → Actions
5. Agrega secret: `VITE_API_URL` con la URL de tu backend

**Paso 7: Deploy**
```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push
```

¡Tu app estará en: `https://tu-usuario.github.io/mobinel-app/`

---

### Opción 2: Deploy con gh-pages (Más simple)

**Paso 1: Instalar gh-pages**
```bash
npm install --save-dev gh-pages
```

**Paso 2: Agregar scripts en package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Paso 3: Deploy**
```bash
npm run deploy
```

---

## 🚀 DESPLIEGUE EN VERCEL (Recomendado)

**Opción más fácil y profesional:**

1. **Push a GitHub** (si no lo has hecho):
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU-USUARIO/mobinel-app.git
git push -u origin main
```

2. **Importar en Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Click "New Project"
   - Importa desde GitHub
   - Selecciona `mobinel-app`

3. **Configurar variables**:
   - En Vercel project settings
   - Environment Variables
   - Agrega: `VITE_API_URL` = URL de tu backend

4. **Deploy automático** ✅
   - Vercel despliega automáticamente
   - URL: `https://mobinel-app.vercel.app`

**Actualizaciones automáticas:**
- Cada push a `main` → redeploy automático
- Preview deployments para pull requests

---

## 🚀 DESPLIEGUE EN NETLIFY

**Opción fácil con drag & drop:**

### Método 1: Netlify Drop

1. Build local:
```bash
npm run build
```

2. Ve a [app.netlify.com/drop](https://app.netlify.com/drop)

3. Arrastra la carpeta `dist/` completa

4. ¡Listo! URL: `https://random-name.netlify.app`

### Método 2: Netlify desde GitHub

1. Push a GitHub (ver instrucciones arriba)

2. En Netlify:
   - New site from Git
   - Connect to GitHub
   - Selecciona repositorio
   
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   
4. Environment variables:
   - Add: `VITE_API_URL`

5. Deploy site

---

## 🔄 CONECTAR CON TU BACKEND ACTUAL

Tu backend actual debe exponer estos endpoints (ejemplo):

```javascript
// En tu backend Node.js/Express:

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://tu-usuario.github.io',
    'https://mobinel-app.vercel.app'
  ],
  credentials: true
}));

// Endpoints necesarios:
app.get('/api/orders', getOrders);
app.get('/api/orders/:id', getOrderById);
app.post('/api/nel/chat', handleNELChat);
app.get('/api/inventory', getInventory);
// ... más endpoints
```

---

## 📱 DESARROLLO DE COMPONENTES

Los componentes principales ya están creados. Para desarrollar más:

### Ejemplo: Mejorar NELInterface

```bash
# Editar componente
code src/components/NELInterface.jsx
```

```jsx
import { useState, useEffect } from 'react';
import { sendMessageToNEL } from '../services/api';

export default function NELInterface({ order }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const handleSend = async () => {
    const response = await sendMessageToNEL(input, order.id);
    setMessages([...messages, response]);
    setInput('');
  };
  
  return (
    <div className="nel-container">
      {/* Tu UI aquí */}
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
npm install
```

### Error de CORS
Configura CORS en tu backend para permitir el origen de tu frontend.

### Build falla
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API no conecta
Verifica la variable `VITE_API_URL` en producción.

---

## 📞 Soporte

Para dudas sobre el proyecto MOBINEL:
- Universidad Jorge Tadeo Lozano
- Proyecto V. Experiencia Intercultural de Diseño

---

## ✅ Checklist de Deployment

- [ ] Código pushed a GitHub
- [ ] Variables de entorno configuradas
- [ ] Backend CORS configurado
- [ ] GitHub Pages/Vercel/Netlify configurado
- [ ] Build exitoso
- [ ] App funciona en producción
- [ ] Conexión con backend verificada

---

## 🎯 Próximos Pasos

1. **Completar componentes** (NELInterface, RealtimeMonitor, etc.)
2. **Conectar con API real** del backend
3. **Agregar autenticación** si es necesario
4. **Testing** con usuarios reales
5. **Optimizaciones** de performance

---

**¡Tu app MOBINEL está lista para el mundo! 🚀**
