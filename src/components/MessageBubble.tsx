import React from 'react';
import type { Message, Product } from '../types';
import { ProductCard } from './ProductCard';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  message: Message;
  onAddToCart: (product: Product) => void;
}

export const MessageBubble: React.FC<Props> = ({ message, onAddToCart }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`message-row ${isUser ? 'user' : 'bot'} animate-slide-up`}>
      <div className="message-bubble">
        {/* Nội dung text */}
        {message.content && (
          <div style={{ marginBottom: message.products || message.type === 'checkout_success' ? '12px' : '0' }}>
            {message.content}
          </div>
        )}
        
        {/* Báo đặt hàng thành công */}
        {message.type === 'checkout_success' && (
          <div style={{ 
            background: 'var(--surface-color)', 
            padding: '16px', 
            borderRadius: '12px',
            border: '1px solid var(--success)',
            marginTop: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', marginBottom: '8px' }}>
              <CheckCircle2 size={20} />
              <strong style={{ fontSize: '1.1rem' }}>Đặt hàng thành công!</strong>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Cảm ơn bạn đã mua sắm. Đơn hàng sẽ sớm được giao đến bạn.
            </p>
          </div>
        )}

        {/* Carousel Sản phẩm */}
        {message.products && message.products.length > 0 && (
          <div className="product-carousel">
            {message.products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
