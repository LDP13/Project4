import React, { useState, useCallback } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { Comment } from '../types/recipe';
import clsx from 'clsx';

interface Props {
  comments: Comment[];
  onAddComment: (content: string, rating: number) => void;
  onDeleteComment: (commentId: string) => void;
  currentUserId: string;
}

export default function Comments({ comments, onAddComment, onDeleteComment, currentUserId }: Props) {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && rating > 0) {
      onAddComment(newComment.trim(), rating);
      setNewComment('');
      setRating(0);
      setHoveredRating(0);
    }
  }, [newComment, rating, onAddComment]);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const renderStars = useCallback((value: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            className={clsx(
              'focus:outline-none',
              interactive && 'transition-colors hover:text-yellow-400'
            )}
          >
            <Star
              className={clsx(
                'w-5 h-5',
                interactive
                  ? (hoveredRating || rating) >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                  : value >= star
                  ? 'fill-yellow-400 text-yellow-400'
                  : value > star - 1
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              )}
              fill={value >= star ? 'currentColor' : 'none'}
            />
          </button>
        ))}
      </div>
    );
  }, [hoveredRating, rating]);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre note
          </label>
          {renderStars(rating, true)}
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Votre commentaire
          </label>
          <textarea
            id="comment"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Partagez votre expérience..."
          />
        </div>
        
        <button
          type="submit"
          disabled={!newComment.trim() || rating === 0}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Ajouter un commentaire
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{comment.userName}</div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                </div>
                {comment.userId === currentUserId && (
                  <button
                    onClick={() => onDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                    title="Supprimer le commentaire"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            {renderStars(comment.rating)}
            <p className="mt-2 text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}