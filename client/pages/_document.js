import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="نظام الإيردروب مع الإحالات" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" 
          rel="stylesheet"
        />
      </Head>
      <body className="font-tajawal bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}