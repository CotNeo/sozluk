import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { IEntry } from '../models/Entry';
import { IUser } from '../models/User';
import { ITopic } from '../models/Topic';

// MongoDB Document tiplerini kullanmak yerine daha basit tipler tanımlayalım
interface SimpleUser {
  _id: string;
  username: string;
  displayName: string;
}

interface SimpleTopic {
  _id: string;
  title?: string;
  slug?: string;
}

interface SimpleEntry {
  _id: string;
  content: string;
  author: SimpleUser;
  topic?: SimpleTopic;
  likes: string[];
  isEdited: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface EntryCardProps {
  entry: SimpleEntry;
  showTopic?: boolean;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, showTopic = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(entry.likes?.length || 0);

  const handleLike = async () => {
    try {
      // Toggle like state
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

      // In a real app, we would call the API to like/unlike the entry
      // const response = await fetch('/api/likes', {
      //   method: isLiked ? 'DELETE' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId: 'currentUserId', entryId: entry._id }),
      // });
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert state on error
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    }
  };

  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Link href={`/user/${entry.author.username}`} className="text-primary font-medium hover:underline">
            {entry.author.displayName}
          </Link>
          <span className="text-gray-500 text-sm ml-2">
            {typeof entry.createdAt === 'string' 
              ? new Date(entry.createdAt).toLocaleDateString('tr-TR')
              : formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true, locale: tr })}
          </span>
          {entry.isEdited && (
            <span className="text-gray-500 text-xs ml-2">(düzenlendi)</span>
          )}
        </div>
        {showTopic && entry.topic && (
          <Link href={`/topic/${entry.topic.slug}`} className="text-sm text-gray-600 hover:underline">
            {entry.topic.title || 'başlık'}
          </Link>
        )}
      </div>

      <div className="prose prose-sm max-w-none mb-3">
        <ReactMarkdown>{entry.content}</ReactMarkdown>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-primary' : ''}`}
          aria-label={isLiked ? 'Beğeniyi kaldır' : 'Beğen'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={isLiked ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{likeCount}</span>
        </button>

        <Link href={`/entry/${entry._id}`} className="flex items-center space-x-1 hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <span>yorum yap</span>
        </Link>
      </div>

      <div>
        <Link href={`/entry/${entry._id}`} className="hover:text-primary">
          permalink
        </Link>
      </div>
    </div>
  );
};

export default EntryCard; 