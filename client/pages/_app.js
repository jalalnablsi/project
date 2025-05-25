import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserContext from '../context/UserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // تحقق من صحة الجلسة عند تحميل التطبيق
    const verifySession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        
        if (res.ok) {
          setUser(data.user);
        } else {
          if (router.pathname !== '/') {
            router.push('/');
          }
        }
      } catch (error) {
        console.error('Session verification failed:', error);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;