import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Регистрация Service Worker с правильным scope
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Определяем базовый путь динамически
        const basePath = window.location.pathname.startsWith('/MF_PWA_A') ? '/MF_PWA_A' : '';
        const swUrl = `${basePath}/sw.js`;
        const scope = `${basePath}/`;
        
        console.log('Registering Service Worker:', swUrl, 'with scope:', scope);
        
        navigator.serviceWorker.register(swUrl, { scope: scope })
            .then(registration => {
                console.log('SW registered successfully with scope: ', registration.scope);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

reportWebVitals();