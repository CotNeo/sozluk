import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TopicFormProps {
  onSuccess?: () => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, we would submit the topic to the API
      // const response = await fetch('/api/topics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     title,
      //     description,
      //     tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      //     author: 'currentUserId',
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to create topic');
      // }
      
      // const data = await response.json();
      
      // Success! Clear the form and notify parent
      setTitle('');
      setDescription('');
      setTags('');
      if (onSuccess) {
        onSuccess();
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect to the home page
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Error creating topic:', err);
      setError('Başlık oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Yeni Başlık</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Başlık
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Başlık giriniz"
            className="input w-full"
            required
            disabled={isSubmitting}
            minLength={3}
            maxLength={100}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Açıklama (isteğe bağlı)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Başlık hakkında kısa bir açıklama"
            className="input w-full h-24 resize-none"
            disabled={isSubmitting}
            maxLength={500}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Etiketler (isteğe bağlı, virgülle ayırın)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="örn: gündem, siyaset, spor"
            className="input w-full"
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-1">
            Etiketler başlığınızın daha kolay bulunmasını sağlar.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting || title.length < 3}
          >
            {isSubmitting ? 'Oluşturuluyor...' : 'Başlık Oluştur'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TopicForm; 