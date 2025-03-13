'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EntryCard from '../components/EntryCard';

interface EntryAuthor {
  _id: string;
  username: string;
  displayName: string;
}

interface EntryTopic {
  _id: string;
  title: string;
  slug: string;
}

interface EntryWithDetails {
  _id: string;
  content: string;
  author: EntryAuthor;
  topic: EntryTopic;
  likes: string[];
  isEdited: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function DebePage() {
  const [entries, setEntries] = useState<EntryWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we would fetch entries from the API
        // const response = await fetch('/api/entries?debe=true');
        // const data = await response.json();
        // setEntries(data.entries);

        // For now, we'll use mock data
        const mockEntries: EntryWithDetails[] = Array.from({ length: 10 }).map((_, index) => ({
          _id: `${index + 1}`,
          content: `Bu dünün en beğenilen entry'lerinden biridir. Bu entry, çok sayıda kullanıcı tarafından beğenilmiştir.\n\n**Önemli bir nokta:** Bu içerik tamamen örnek amaçlıdır ve gerçek bir içerik değildir.\n\n*Daha fazla bilgi için konuyla ilgili diğer entrylere bakabilirsiniz.*`,
          author: {
            _id: '1',
            username: 'user' + (index % 5 + 1),
            displayName: 'Kullanıcı ' + (index % 5 + 1),
          },
          topic: {
            _id: `${index + 1}`,
            title: `Dünün Popüler Başlığı ${index + 1}`,
            slug: `dunun-populer-basligi-${index + 1}`,
          },
          likes: Array.from({ length: Math.floor(Math.random() * 200) + 100 }).map((_, i) => `user${i}`),
          isEdited: Math.random() > 0.7,
          isFeatured: true,
          createdAt: new Date(Date.now() - 86400000 - Math.floor(Math.random() * 86400000)), // 1-2 gün önce
          updatedAt: new Date(Date.now() - 86400000 - Math.floor(Math.random() * 43200000)), // 1-1.5 gün önce
        }));

        setEntries(mockEntries);
      } catch (err) {
        console.error('Error fetching entries:', err);
        setError('Entryler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="container mx-auto flex-grow p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dünün En Beğenilen Entryleri (DEBE)</h1>
          <p className="text-gray-600 mt-2">
            Dün en çok beğeni alan entryler burada listelenmektedir.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6 mb-4"></div>
                <div className="h-24 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-6 rounded-xl text-center">
            <p className="font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 btn-outline text-red-500 border-red-500 hover:bg-red-50"
            >
              Tekrar Dene
            </button>
          </div>
        ) : entries.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <p className="text-gray-500">Dün beğenilen entry bulunmuyor.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {entries.map((entry, index) => (
              <div key={entry._id} className="card hover:shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="badge badge-primary">DEBE #{index + 1}</span>
                  <Link href={`/topic/${entry.topic.slug}`} className="text-primary hover:underline font-medium">
                    {entry.topic.title}
                  </Link>
                </div>
                <EntryCard entry={entry} showTopic={false} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
} 