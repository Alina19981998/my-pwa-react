import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const [isAppInstalled, setIsAppInstalled] = useState(false);
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'register'

    useEffect(() => {
        // 1. Проверяем запущено ли как установленное PWA
        const checkIfInstalled = () => {
            // Для iOS
            const isInWebApp = window.navigator.standalone === true;
            // Для Android/Desktop
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

            const installed = isInWebApp || isStandalone;
            setIsAppInstalled(installed);

            if (installed) {
                console.log('📱 PWA запущено как установленное приложение');
            } else {
                console.log('🌐 PWA запущено в браузере');
            }
        };

        // 2. Слушаем событие установки
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallButton(true);
            console.log('✅ PWA можно установить!');
        };

        // 3. Слушаем когда приложение установили
        const handleAppInstalled = () => {
            setIsAppInstalled(true);
            setShowInstallButton(false);
            console.log('🎉 PWA успешно установлено!');
        };

        checkIfInstalled();

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const installApp = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('🎉 Пользователь установил PWA');
                    setShowInstallButton(false);
                    setIsAppInstalled(true);
                }
                setDeferredPrompt(null);
            });
        }
    };

    // 🎯 СТРАНИЦА УСТАНОВКИ (показываем ТОЛЬКО в браузере)
    const InstallPromptPage = () => (
        <div className="install-page">
            <div className="ios-style">
                <h1>📱 Установите наше приложение!</h1>
                <p>Получите лучший опыт использования</p>
            </div>

            <div className="container">
                <div className="features">
                    <div className="feature">
                        <span className="icon">⚡</span>
                        <h3>Быстрее</h3>
                        <p>Мгновенная загрузка</p>
                    </div>
                    <div className="feature">
                        <span className="icon">📱</span>
                        <h3>На устройстве</h3>
                        <p>Как нативное приложение</p>
                    </div>
                    <div className="feature">
                        <span className="icon">🔔</span>
                        <h3>Уведомления</h3>
                        <p>Будьте в курсе событий</p>
                    </div>
                </div>

                {/* Кнопка установки */}
                {showInstallButton && (
                    <button
                        onClick={installApp}
                        className="install-button"
                    >
                        📥 Установить приложение
                    </button>
                )}

                <p className="install-hint">
                    Нажмите "Установить" и добавьте приложение на главный экран
                </p>

                {/* Временная ссылка для тестирования */}
                <div style={{marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '10px'}}>
                    <p><strong>Для тестирования:</strong></p>
                    <button
                        onClick={() => setIsAppInstalled(true)}
                        style={{padding: '8px 15px', margin: '5px'}}
                    >
                        🔧 Тест: Показать домашнюю страницу
                    </button>
                </div>
            </div>
        </div>
    );

    // 🎯 ГЛАВНАЯ СТРАНИЦА (показываем ТОЛЬКО в установленном PWA)
    const HomePage = () => (
        <div className="home-page">
            {/* Шапка навигации */}
            <header className="app-header">
                <nav className="nav-buttons">
                    <button onClick={() => setCurrentPage('home')}>🏠 Главная</button>
                    <button onClick={() => setCurrentPage('login')}>🔐 Вход</button>
                    <button onClick={() => setCurrentPage('register')}>📝 Регистрация</button>
                </nav>
                <div className="installed-badge">
                    ✅ Установлено
                </div>
            </header>

            {/* Контент страницы */}
            <main className="main-content">
                {currentPage === 'home' && (
                    <div>
                        <h1>Добро пожаловать в приложение! 🎉</h1>
                        <p>Вы успешно установили наше PWA приложение.</p>

                        <div className="features-box">
                            <h2>Что вы можете делать:</h2>
                            <ul>
                                <li>📝 Регистрироваться и входить</li>
                                <li>💾 Работать офлайн</li>
                                <li>🔔 Получать уведомления</li>
                                <li>📱 Использовать как нативное приложение</li>
                            </ul>
                        </div>
                    </div>
                )}

                {currentPage === 'login' && (
                    <div>
                        <h2>🔐 Вход в систему</h2>
                        <form style={{maxWidth: '300px', margin: '0 auto'}}>
                            <input type="text" placeholder="Имя пользователя" style={{width: '100%', padding: '10px', margin: '10px 0'}} />
                            <input type="password" placeholder="Пароль" style={{width: '100%', padding: '10px', margin: '10px 0'}} />
                            <button type="submit" style={{width: '100%', padding: '10px'}}>Войти</button>
                        </form>
                    </div>
                )}

                {currentPage === 'register' && (
                    <div>
                        <h2>📝 Регистрация</h2>
                        <form style={{maxWidth: '300px', margin: '0 auto'}}>
                            <input type="text" placeholder="Имя пользователя" style={{width: '100%', padding: '10px', margin: '10px 0'}} />
                            <input type="password" placeholder="Пароль" style={{width: '100%', padding: '10px', margin: '10px 0'}} />
                            <input type="password" placeholder="Повторите пароль" style={{width: '100%', padding: '10px', margin: '10px 0'}} />
                            <button type="submit" style={{width: '100%', padding: '10px'}}>Зарегистрироваться</button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );

    // 🎯 ГЛАВНАЯ ЛОГИКА: что показывать?
    // Если приложение УСТАНОВЛЕНО → показываем HomePage
    // Если в БРАУЗЕРЕ и можно установить → показываем InstallPromptPage
    // Если в БРАУЗЕРЕ но нельзя установить → показываем HomePage с кнопкой установки

    if (isAppInstalled) {
        return <HomePage />;
    }

    // В браузере - показываем страницу установки
    return <InstallPromptPage />;
}

export default App;