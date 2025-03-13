'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage(): ReactNode {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Kullanıcı adı veya şifre hatalı.');
        return;
      }

      // Redirect to home page on successful login
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setError('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="card">
            <div className="text-center mb-8">
              <Link href="/" className="text-3xl font-bold inline-flex items-center">
                <span className="text-secondary">hub</span>
                <span className="text-primary">X</span>
                <span className="text-gray-600 ml-1 font-normal">sözlük</span>
              </Link>
              <h1 className="text-2xl font-bold mt-6 text-gray-800">Giriş Yap</h1>
              <p className="text-gray-500 mt-2">Hesabınıza giriş yaparak devam edin</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input w-full"
                  required
                  disabled={isLoading}
                  placeholder="kullaniciadi"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Şifre
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Şifremi Unuttum
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full"
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Giriş Yapılıyor...
                  </span>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Hesabınız yok mu?{' '}
                <Link href="/register" className="text-primary font-medium hover:underline">
                  Kayıt Ol
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 