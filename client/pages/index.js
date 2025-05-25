import { useEffect } from 'react';
import { useRouter } from 'next/router';
import TelegramLogin from '../components/TelegramLogin';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const { ref } = router.query;

  const handleAuth = async (userData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, ref })
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        alert('حدث خطأ أثناء التسجيل');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('فشل الاتصال بالخادم');
    }
  };

  return (
    <>
      <Head>
        <title>نظام الإيردروب | التسجيل</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md w-full mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
              <span className="text-indigo-600 text-2xl">🎁</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">انضم إلى الإيردروب!</h2>
            <p className="text-white/80 mb-6">
              سجل عبر تليجرام وابدأ بكسب النقاط اليوم
            </p>
            
            <TelegramLogin onAuth={handleAuth} />
            
            <p className="mt-6 text-xs text-white/60">
              بالاستمرار أنت توافق على 
              <a href="#" className="underline ml-1">الشروط والأحكام</a>
            </p>
          </div>
          
          <div className="bg-black/10 px-4 py-3 text-center">
            <p className="text-white/70 text-sm">
              لديك حساب بالفعل؟ 
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-white font-medium underline ml-1"
              >
                الدخول الآن
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}