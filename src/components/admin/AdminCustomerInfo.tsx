import React from 'react';
import type { CartItem } from '../../types';
import { formatPrice } from '../../data/mockData';

interface Props {
  customer: { name: string; avatar: string };
  cartItems: CartItem[];
}

export const AdminCustomerInfo: React.FC<Props> = ({ customer, cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="admin-customer-info glass">
      <div className="customer-profile">
        <img src={customer.avatar} alt={customer.name} />
        <h3>{customer.name}</h3>
        <p>Khách hàng thân thiết</p>
      </div>
      
      <div className="info-section">
        <h4>Đang trong giỏ hàng ({cartItems.length})</h4>
        {cartItems.length === 0 ? (
          <p className="empty-text">Chưa chọn sản phẩm nào</p>
        ) : (
          <div className="admin-cart-items">
            {cartItems.map(item => (
              <div key={item.product.id} className="admin-cart-item">
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <p className="item-name">{item.product.name}</p>
                  <p className="item-price">{formatPrice(item.product.price)} x {item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="admin-cart-total">
              <strong>Tổng:</strong>
              <span className="success-text">{formatPrice(total)}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="info-section">
        <h4>Ghi chú đơn hàng</h4>
        <textarea placeholder="Thêm ghi chú cho khách hàng này..." rows={3}></textarea>
      </div>

      <div className="info-section">
        <h4>Feedback & Đánh giá</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Chuột Logitech MX Master</span>
              <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>★★★★★</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              "Chuột dùng rất êm, giao hàng siêu nhanh. Shop tư vấn nhiệt tình."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
