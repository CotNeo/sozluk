import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { ReactNode } from 'react';

export default function Home(): ReactNode {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-secondary">hub</span>
                <span className="text-primary">X</span>
                <span className="text-gray-700"> sözlük</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Modern bir sosyal sözlük platformu. İstediğiniz konuda fikir paylaşın, tartışın ve keşfedin.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="btn-primary">
                  Hemen Kayıt Ol
                </Link>
                <Link href="/popular" className="btn-outline">
                  Popüler Başlıkları Keşfet
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-lg"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/20 rounded-lg"></div>
                <div className="relative bg-white p-6 rounded-xl shadow-custom-lg border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Gündemdekiler</h2>
                  <ul className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <li key={index} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                        <Link href={`/topic/${index}`} className="block hover:text-primary transition-colors">
                          <span className="font-medium">örnek gündem başlığı {index + 1}</span>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              {Math.floor(Math.random() * 50) + 5} entry
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-center">
                    <Link href="/popular" className="text-primary text-sm hover:underline">
                      Tümünü Gör &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="card mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">gündem</h2>
                  <Link href="/popular" className="text-primary text-sm hover:underline">
                    tümünü gör
                  </Link>
                </div>
                <ul className="space-y-4">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <li key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <Link href={`/topic/${index}`} className="block hover:text-primary transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium">örnek gündem başlığı {index + 1}</span>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              Bu başlık altında çeşitli entryler bulunmaktadır. Konuyla ilgili görüşlerinizi paylaşabilirsiniz.
                            </p>
                          </div>
                          <span className="badge badge-primary whitespace-nowrap ml-2">
                            {Math.floor(Math.random() * 50) + 5} entry
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="card mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">bugün</h2>
                <ul className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <Link href={`/topic/${index + 10}`} className="block hover:text-primary transition-colors">
                        <span className="font-medium">günün başlığı {index + 1}</span>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>{Math.floor(Math.random() * 20) + 3} entry</span>
                          <span className="mx-2">•</span>
                          <span>bugün</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">debe</h2>
                <ul className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <Link href={`/topic/${index + 20}`} className="block hover:text-primary transition-colors">
                        <span className="font-medium">dünün en beğenilen entry&apos;si {index + 1}</span>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {Math.floor(Math.random() * 100) + 50}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-center">
                  <Link href="/debe" className="text-primary text-sm hover:underline">
                    Tüm DEBE &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 