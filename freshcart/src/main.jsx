import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { HelmetProvider } from 'react-helmet-async'



createRoot(document.getElementById('root')).render(
    <HelmetProvider>
 <App />
    </HelmetProvider>

)
