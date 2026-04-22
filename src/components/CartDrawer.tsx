import React from 'react';
import { X, Plus, Minus, CreditCard } from 'lucide-react';
import type { CartItem } from '../types';
import { formatPrice } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<Props> = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <div className="cart-overlay animate-fade-in" onClick={onClose} />
      <div className="cart-drawer animate-slide-right">
        <div className="cart-header">
          <h2>Giỏ hàng của bạn</h2>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="cart-items">
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
              Giỏ hàng đang trống
            </p>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.product.name}</h4>
                  <span className="cart-item-price">{formatPrice(item.product.price)}</span>
                  <div className="cart-item-actions">
                    <button 
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Tổng cộng:</span>
              <span style={{ color: 'var(--success)' }}>{formatPrice(total)}</span>
            </div>
            <button className="btn-checkout" onClick={onCheckout}>
              <CreditCard size={20} />
              Tiến hành đặt hàng
            </button>
          </div>
        )}
      </div>
    </>
  );
};
