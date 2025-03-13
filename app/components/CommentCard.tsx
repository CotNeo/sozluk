import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { IComment } from '../models/Comment';
import { IUser } from '../models/User';

interface CommentCardProps {
  comment: IComment & {
    author: IUser;
  };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);

  const handleLike = async () => {
    try {
      // Toggle like state
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

      // In a real app, we would call the API to like/unlike the comment
      // const response = await fetch('/api/likes', {
      //   method: isLiked ? 'DELETE' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId: 'currentUserId', commentId: comment._id }),
      // });
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert state on error
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    }
  };

  return (
    <div className="bg-gray-50 p-3 rounded-md mb-2">
      <div className="flex justify-between items-start mb-2">
        <div>
          <Link href={`/user/${comment.author.username}`} className="text-primary font-medium hover:underline">
            {comment.author.displayName}
          </Link>
          <span className="text-gray-500 text-sm ml-2">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: tr })}
          </span>
          {comment.isEdited && (
            <span className="text-gray-500 text-xs ml-2">(düzenlendi)</span>
          )}
        </div>
      </div>

      <div className="text-sm mb-2">
        {comment.content}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-primary' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
      </div>
    </div>
  );
};

export default CommentCard; 