import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface CommentAuthor {
  _id: string;
  username: string;
  displayName: string;
}

interface Comment {
  _id: string;
  content: string;
  author: CommentAuthor;
  entryId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface CommentSectionProps {
  entryId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ entryId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we would fetch comments from the API
        // const response = await fetch(`/api/comments?entryId=${entryId}`);
        // const data = await response.json();
        // setComments(data.comments);

        // For now, we'll use mock data
        const mockComments: Comment[] = Array.from({ length: Math.floor(Math.random() * 5) }).map((_, index) => ({
          _id: `comment-${index + 1}`,
          content: `Bu bir örnek yorum içeriğidir. Entry hakkında düşüncelerimi paylaşıyorum. #${index + 1}`,
          author: {
            _id: `user-${index + 1}`,
            username: `user${index + 1}`,
            displayName: `Kullanıcı ${index + 1}`,
          },
          entryId,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)), // Son 24 saat içinde
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 3600000)), // Son 1 saat içinde
        }));

        setComments(mockComments);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Yorumlar yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [entryId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send data to the API
      // const response = await fetch('/api/comments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     content: newComment,
      //     entryId,
      //   }),
      // });
      
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Yorum oluşturulurken bir hata oluştu.');
      // }
      
      // const data = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a mock comment
      const mockComment: Comment = {
        _id: `comment-${Date.now()}`,
        content: newComment,
        author: {
          _id: 'current-user',
          username: 'currentuser',
          displayName: 'Mevcut Kullanıcı',
        },
        entryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Add the new comment to the list
      setComments([mockComment, ...comments]);
      
      // Clear the form
      setNewComment('');
    } catch (err) {
      console.error('Error creating comment:', err);
      setError(err instanceof Error ? err.message : 'Yorum oluşturulurken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Yorumlar</h3>
      
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="mb-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Yorumunuzu yazın..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary min-h-[100px] resize-none"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gönderiliyor...
              </>
            ) : 'Yorum Yap'}
          </button>
        </div>
      </form>
      
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm underline"
          >
            Tekrar Dene
          </button>
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-500">Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <Link href={`/user/${comment.author.username}`} className="text-primary font-medium hover:underline">
                  {comment.author.displayName}
                </Link>
                <span className="text-xs text-gray-500">
                  {typeof comment.createdAt === 'string' 
                    ? new Date(comment.createdAt).toLocaleDateString('tr-TR')
                    : formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: tr })}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection; 