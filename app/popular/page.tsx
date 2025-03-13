'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopicCard from '../components/TopicCard';

interface TopicAuthor {
  _id: string;
  username: string;
  displayName: string;
}

interface Topic {
  _id: string;
  title: string;
  slug: string;
  description: string;
  author: TopicAuthor;
  entryCount: number;
  isPopular: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function PopularPage(): ReactNode {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we would fetch topics from the API
        // const response = await fetch('/api/topics?popular=true');
        // const data = await response.json();
        // setTopics(data.topics);

        // For now, we'll use mock data
        const mockTopics: Topic[] = Array.from({ length: 15 }).map((_, index) => ({
          _id: `${index + 1}`,
          title: `Popüler Başlık ${index + 1}`,
          slug: `populer-baslik-${index + 1}`,
          description: `Bu popüler bir başlık açıklamasıdır. Bu başlık altında çeşitli entryler bulunmaktadır. Konu hakkında görüşlerinizi paylaşabilirsiniz.`,
          author: {
            _id: '1',
            username: 'user1',
            displayName: 'Kullanıcı ' + (index % 5 + 1),
          },
          entryCount: Math.floor(Math.random() * 100) + 20,
          isPopular: true,
          isFeatured: index < 3,
          tags: ['popüler', 'gündem', `etiket-${index}`],
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000),
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 5) * 86400000),
        }));

        setTopics(mockTopics);
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError('Başlıklar yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="container mx-auto flex-grow p-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Popüler Başlıklar</h1>
          <Link href="/topics/create" className="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Başlık
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-24 bg-gray-200 rounded-xl mb-4"></div>
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
        ) : topics.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <p className="text-gray-500">Henüz popüler başlık bulunmuyor.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {topics.map((topic) => (
              <TopicCard key={topic._id} topic={topic} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
} 