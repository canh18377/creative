import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import type { Product, Review } from '../types';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  // Cập nhật reviews khi đổi sản phẩm
  React.useEffect(() => {
    if (product) {
      setLocalReviews(product.reviews || []);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      user: 'Khách hàng (Bạn)',
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setLocalReviews([review, ...localReviews]);
    setNewComment('');
    setNewRating(5);
  };

  return (
    <>
      <div className="cart-overlay animate-fade-in" onClick={onClose} style={{ zIndex: 60 }} />
      <div className="animate-slide-up glass" style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '90%', maxWidth: '500px', maxHeight: '85vh', zIndex: 70,
        borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-color)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Đánh giá sản phẩm</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{product.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>{product.rating}</span>
                <span style={{ color: '#fbbf24' }}>
                  <Star fill="currentColor" size={20} />
                </span>
                <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount} đánh giá)</span>
              </div>
            </div>
          </div>

          {/* Form đánh giá của người dùng */}
          <form onSubmit={handleSubmitReview} style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '0.95rem' }}>Viết đánh giá của bạn</h4>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} type="button" 
                  onClick={() => setNewRating(star)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: star <= newRating ? '#fbbf24' : 'var(--text-muted)' }}
                >
                  <Star fill={star <= newRating ? "currentColor" : "none"} size={24} />
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
              />
              <button type="submit" disabled={!newComment.trim()} style={{ padding: '0 16px', borderRadius: '8px', background: newComment.trim() ? 'var(--primary)' : 'var(--surface-hover)', color: 'white', border: 'none', cursor: newComment.trim() ? 'pointer' : 'not-allowed' }}>
                <Send size={18} />
              </button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {localReviews.length > 0 ? (
              localReviews.map(review => (
                <div key={review.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600 }}>{review.user}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{review.date}</span>
                  </div>
                  <div style={{ color: '#fbbf24', fontSize: '0.85rem', marginBottom: '8px', letterSpacing: '2px' }}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                    "{review.comment}"
                  </p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '20px 0' }}>
                Chưa có đánh giá chi tiết nào. Hãy là người đầu tiên đánh giá!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
