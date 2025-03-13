'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import EntryCard from '../../components/EntryCard';
import CommentSection from '../../components/CommentSection';

interface EntryAuthor {
  _id: string;
  username: string;
  displayName: string;
}

interface EntryTopic {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

interface Entry {
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

// Mock data for entry
const mockEntry: Entry = {
  _id: '1',
  content: 'Bu bir örnek entry içeriğidir. Markdown formatında yazılabilir.\n\n**Kalın** ve *italik* yazı kullanılabilir.\n\nBu entry detay sayfasında görüntülenmektedir.',
  likes: [],
  isEdited: false,
  isFeatured: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  author: {
    _id: '1',
    username: 'user1',
    displayName: 'Kullanıcı 1',
  },
  topic: {
    _id: '1',
    title: 'Örnek Başlık',
    slug: 'ornek-baslik',
    description: 'Bu bir örnek başlık açıklamasıdır.',
  }
};

export default function EntryPage(): ReactNode {
  const params = useParams();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we would fetch the entry from the API
        // const response = await fetch(`/api/entries/${params.id}`);
        // const data = await response.json();
        // setEntry(data.entry);

        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock entry data
        setEntry(mockEntry);
      } catch (err) {
        console.error('Error fetching entry:', err);
        setError('Entry yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        <Header />
        <section className="container mx-auto flex-grow p-4 py-8">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (error || !entry) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        <Header />
        <section className="container mx-auto flex-grow p-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              {error || 'Entry bulunamadı'}
            </h1>
            <p className="mb-6">
              İstediğiniz entry bulunamadı veya bir hata oluştu.
            </p>
            <Link href="/" className="btn-primary">
              Ana Sayfaya Dön
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="container mx-auto flex-grow p-4 py-8">
        <div className="mb-4">
          <Link href={`/topic/${entry.topic.slug}`} className="text-primary hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {entry.topic.title} başlığına dön
          </Link>
        </div>

        <div className="mb-8">
          <EntryCard entry={entry} showTopic={false} />
        </div>

        <CommentSection entryId={entry._id} />
      </section>

      <Footer />
    </main>
  );
} 