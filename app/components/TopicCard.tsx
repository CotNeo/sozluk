import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

// MongoDB Document tiplerini kullanmak yerine daha basit tipler tanımlayalım
interface SimpleUser {
  _id: string;
  username: string;
  displayName: string;
}

interface SimpleTopic {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  author: SimpleUser;
  entryCount: number;
  isPopular: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface TopicCardProps {
  topic: SimpleTopic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <Link href={`/topic/${topic.slug}`} className="block">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors">
              {topic.title}
            </h2>
            <span className="text-xs text-gray-500">
              {typeof topic.createdAt === 'string' 
                ? new Date(topic.createdAt).toLocaleDateString('tr-TR')
                : formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true, locale: tr })}
            </span>
          </div>
          
          {topic.description && (
            <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
          )}
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <Link href={`/user/${topic.author.username}`} className="text-primary hover:underline">
                {topic.author.displayName}
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                {topic.entryCount} entry
              </span>
              
              {topic.isPopular && (
                <span className="bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full text-xs">
                  popüler
                </span>
              )}
              
              {topic.isFeatured && (
                <span className="bg-secondary bg-opacity-10 text-secondary px-2 py-0.5 rounded-full text-xs">
                  gündem
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TopicCard; 