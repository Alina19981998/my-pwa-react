import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallButton(true);
            console.log('✅ PWA можно установить!');
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const installApp = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Пользователь установил PWA');
                    setShowInstallButton(false);
                }
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <div className="">
            <div className="ios-style">
                <h1>📱 Мое Приложение</h1>
                <p>Теперь работает как приложение!</p>
            </div>
            <div className="container">
                <h2>Добро пожаловать!</h2>
                <p>Этот сайт теперь установлен как приложение на вашем iPhone.</p>

                {/* ✅ Кнопка установки PWA */}
                {showInstallButton && (
                    <button
                        onClick={installApp}
                        style={{
                            padding: '10px 20px',
                            fontSize: '18px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            margin: '20px'
                        }}
                    >
                        📱 Установить приложение
                    </button>
                )}

                <div>
                    <h3>✅ Установлено как приложение</h3>
                    <p>Приложение запускается в отдельном окне без адресной строки браузера.</p>
                </div>
            </div>
        </div>
    );
}

export default App;