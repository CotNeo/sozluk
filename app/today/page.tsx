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

export default function TodayPage(): ReactNode {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we would fetch topics from the API
        // const response = await fetch('/api/topics?today=true');
        // const data = await response.json();
        // setTopics(data.topics);

        // For now, we'll use mock data
        const mockTopics: Topic[] = Array.from({ length: 12 }).map((_, index) => ({
          _id: `${index + 1}`,
          title: `Bugünün Başlığı ${index + 1}`,
          slug: `bugunun-basligi-${index + 1}`,
          description: `Bu bugün oluşturulmuş bir başlık açıklamasıdır. Bu başlık altında güncel entryler bulunmaktadır.`,
          author: {
            _id: '1',
            username: 'user1',
            displayName: 'Kullanıcı ' + (index % 5 + 1),
          },
          entryCount: Math.floor(Math.random() * 50) + 5,
          isPopular: index < 5,
          isFeatured: index < 2,
          tags: ['güncel', 'bugün', `etiket-${index}`],
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 24) * 3600000), // Son 24 saat içinde
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 3) * 3600000), // Son 3 saat içinde
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
          <h1 className="text-3xl font-bold text-gray-800">Bugünkü Başlıklar</h1>
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
            <p className="text-gray-500">Bugün henüz başlık oluşturulmamış.</p>
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