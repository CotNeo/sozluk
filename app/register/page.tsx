'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RegisterPage(): ReactNode {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!username.trim() || !email.trim() || !displayName.trim() || !password.trim()) {
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, we would submit the registration to the API
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     username,
      //     email,
      //     displayName,
      //     password,
      //   }),
      // });
      
      // if (!response.ok) {
      //   const data = await response.json();
      //   throw new Error(data.error || 'Registration failed');
      // }
      
      // Success! Show success message and redirect after a delay
      setSuccess(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to login page
      router.push('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
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
              <h1 className="text-2xl font-bold mt-6 text-gray-800">Kayıt Ol</h1>
              <p className="text-gray-500 mt-2">Yeni bir hesap oluşturarak topluluğa katılın</p>
            </div>

            {success ? (
              <div className="bg-green-50 text-green-600 p-6 rounded-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold mb-2">Kayıt İşlemi Başarılı!</h2>
                <p className="mb-4">Hesabınız başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz...</p>
                <div className="flex justify-center">
                  <div className="animate-pulse flex space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                    minLength={3}
                    maxLength={20}
                    placeholder="kullaniciadi"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    3-20 karakter, özel karakterler kullanmayın.
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input w-full"
                    required
                    disabled={isLoading}
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                    Görünen İsim
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input w-full"
                    required
                    disabled={isLoading}
                    maxLength={50}
                    placeholder="Görünen İsminiz"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Şifre
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input w-full"
                    required
                    disabled={isLoading}
                    minLength={6}
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    En az 6 karakter olmalıdır.
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Şifre Tekrar
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  className="btn-primary w-full py-2.5 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Kayıt Yapılıyor...
                    </span>
                  ) : (
                    'Kayıt Ol'
                  )}
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Zaten hesabınız var mı?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Giriş Yap
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