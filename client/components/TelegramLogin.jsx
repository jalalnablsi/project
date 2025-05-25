import { useEffect } from 'react';

export default function TelegramLogin({ onAuth }) {
  useEffect(() => {
    // Cleanup any existing script
    const existingScript = document.getElementById('telegram-login-script');
    if (existingScript) {
      document.body.removeChild(existingScript);
    }

    // Create global callback function
    window.handleTelegramAuth = (user) => {
      onAuth(user);
    };

    // Create and append new script
    const script = document.createElement('script');
    script.id = 'telegram-login-script';
    script.src = "https://telegram.org/js/telegram-widget.js?21";
    script.async = true;
    script.setAttribute('data-telegram-login', process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'handleTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'true');
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete window.handleTelegramAuth;
    };
  }, []);

  return (
    <div className="telegram-login-wrapper">
      <div id="telegram-login-button"></div>
      <style jsx>{`
        .telegram-login-wrapper {
          min-height: 50px;
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}