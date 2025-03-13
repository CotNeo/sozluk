'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import EntryCard from '../../components/EntryCard';
import EntryForm from '../../components/EntryForm';

interface TopicPageProps {
  params: {
    slug: string;
  };
}

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

interface EntryAuthor {
  _id: string;
  username: string;
  displayName: string;
}

interface Entry {
  _id: string;
  content: string;
  author: EntryAuthor;
  topic: string;
  likes: string[];
  isEdited: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data for topic
const mockTopic: Topic = {
  _id: '1',
  title: 'Örnek Başlık',
  slug: 'ornek-baslik',
  description: 'Bu bir örnek başlık açıklamasıdır.',
  author: {
    _id: '1',
    username: 'user1',
    displayName: 'Kullanıcı 1',
  },
  entryCount: 2,
  isPopular: true,
  isFeatured: false,
  tags: ['örnek', 'test'],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock data for entries
const mockEntries: Entry[] = [
  {
    _id: '1',
    content: 'Bu bir örnek entry içeriğidir. Markdown formatında yazılabilir.\n\n**Kalın** ve *italik* yazı kullanılabilir.',
    author: {
      _id: '1',
      username: 'user1',
      displayName: 'Kullanıcı 1',
    },
    topic: '1',
    likes: [],
    isEdited: false,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    content: 'Bu başka bir örnek entry içeriğidir. Daha uzun ve detaylı olabilir.\n\nBirden fazla paragraf içerebilir ve çeşitli konuları ele alabilir.',
    author: {
      _id: '2',
      username: 'user2',
      displayName: 'Kullanıcı 2',
    },
    topic: '1',
    likes: ['1'],
    isEdited: true,
    isFeatured: true,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    updatedAt: new Date(Date.now() - 1800000), // 30 minutes ago
  },
];

export default function TopicPage({ params }: TopicPageProps) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);

  useEffect(() => {
    const fetchTopicAndEntries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we would fetch the topic and entries from the API
        // const topicResponse = await fetch(`/api/topics/${params.slug}`);
        // const entriesResponse = await fetch(`/api/entries?topic=${topicId}`);
        // const topicData = await topicResponse.json();
        // const entriesData = await entriesResponse.json();
        // setTopic(topicData);
        // setEntries(entriesData.entries);

        // For now, we'll use mock data
        setTopic(mockTopic);
        setEntries(mockEntries);
      } catch (err) {
        console.error('Error fetching topic data:', err);
        setError('Başlık bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopicAndEntries();
  }, [params.slug]);

  const handleNewEntrySuccess = () => {
    setShowEntryForm(false);
    // In a real app, we would refetch the entries
    // For now, we'll just close the form
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        <Header />
        <section className="container mx-auto flex-grow p-4 py-8">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
              <div className="h-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-24 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (error || !topic) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        <Header />
        <section className="container mx-auto flex-grow p-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              {error || 'Başlık bulunamadı'}
            </h1>
            <p className="mb-6">
              İstediğiniz başlık bulunamadı veya bir hata oluştu.
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{topic.title}</h1>
          {topic.description && (
            <p className="text-gray-600 mb-4">{topic.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {topic.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <span>
                <Link href={`/user/${topic.author.username}`} className="text-primary hover:underline">
                  {topic.author.displayName}
                </Link>{' '}
                tarafından oluşturuldu
              </span>
            </div>
            <button
              onClick={() => setShowEntryForm(!showEntryForm)}
              className="btn-primary text-sm"
            >
              {showEntryForm ? 'İptal' : 'Entry Ekle'}
            </button>
          </div>
        </div>

        {showEntryForm && (
          <div className="mb-8">
            <EntryForm topicId={topic._id} onSuccess={handleNewEntrySuccess} />
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Entryler ({entries.length})</h2>
          {entries.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-500">Bu başlık altında henüz entry bulunmuyor.</p>
              <button
                onClick={() => setShowEntryForm(true)}
                className="btn-primary mt-4"
              >
                İlk Entry&apos;yi Sen Ekle
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {entries.map((entry) => (
                <EntryCard 
                  key={entry._id} 
                  entry={{
                    ...entry,
                    topic: {
                      _id: topic._id,
                      title: topic.title,
                      slug: topic.slug
                    }
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
} 