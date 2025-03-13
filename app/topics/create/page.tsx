'use client';

import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CreateTopicPage(): ReactNode {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [firstEntry, setFirstEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title.trim()) {
      setError('Başlık alanı zorunludur.');
      return;
    }
    
    if (!firstEntry.trim()) {
      setError('İlk entry alanı zorunludur.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, we would send data to the API
      // const response = await fetch('/api/topics', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     title,
      //     description,
      //     tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      //     firstEntry,
      //   }),
      // });
      
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Başlık oluşturulurken bir hata oluştu.');
      // }
      
      // const data = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      setSuccess(true);
      
      // In a real app, we would redirect to the new topic page
      // router.push(`/topic/${data.slug}`);
      
      // For now, we'll just reset the form after 2 seconds
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setTags('');
        setFirstEntry('');
        setSuccess(false);
        
        // Simulate redirect
        const slug = title.toLowerCase()
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ç/g, 'c')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
          
        router.push(`/topic/${slug}`);
      }, 2000);
    } catch (err) {
      console.error('Error creating topic:', err);
      setError(err instanceof Error ? err.message : 'Başlık oluşturulurken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="container mx-auto flex-grow p-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Yeni Başlık Oluştur</h1>
            <p className="text-gray-600 mt-2">
              Sözlüğe yeni bir başlık ekleyin ve ilk entry&apos;i siz yazın.
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 text-green-600 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">Başlık başarıyla oluşturuldu!</h3>
              <p>Yönlendiriliyorsunuz...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-6">
              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                  <p>{error}</p>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Başlık *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Başlık giriniz"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Açıklama <span className="text-gray-500 text-sm">(İsteğe bağlı)</span>
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Başlık hakkında kısa bir açıklama"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
                  Etiketler <span className="text-gray-500 text-sm">(Virgülle ayırın, isteğe bağlı)</span>
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="örn: teknoloji, bilim, gündem"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="firstEntry" className="block text-gray-700 font-medium mb-2">
                  İlk Entry *
                </label>
                <textarea
                  id="firstEntry"
                  value={firstEntry}
                  onChange={(e) => setFirstEntry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary min-h-[200px]"
                  placeholder="Başlık hakkında ilk entry'i yazın"
                  disabled={isLoading}
                  required
                />
                <p className="text-gray-500 text-sm mt-2">
                  Markdown formatı desteklenmektedir. **kalın**, *italik*, [link](url) kullanabilirsiniz.
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Link
                  href="/"
                  className="btn-outline"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Oluşturuluyor...
                    </>
                  ) : 'Başlık Oluştur'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center text-gray-600">
            <p>
              Başlık oluşturmadan önce lütfen{' '}
              <Link href="/kurallar" className="text-primary hover:underline">
                sözlük kurallarını
              </Link>{' '}
              okuyunuz.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 