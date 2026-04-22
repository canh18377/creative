import React from 'react';
import { TrendingUp, Users, Star, MessageSquareQuote } from 'lucide-react';
import { mockProducts } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  return (
    <div style={{ flex: 1, padding: '30px', background: 'rgba(15,23,42,0.8)', overflowY: 'auto' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Tổng quan Thống kê</h2>
      
      {/* Chỉ số chính */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--text-muted)' }}>
            <TrendingUp size={20} color="var(--primary)" />
            <span>Doanh thu hôm nay</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--success)' }}>12.450.000đ</div>
        </div>

        <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--text-muted)' }}>
            <Users size={20} color="#3b82f6" />
            <span>Khách hàng chat</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>45</div>
        </div>

        <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--text-muted)' }}>
            <Star size={20} color="#fbbf24" />
            <span>Rating trung bình</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>4.8/5.0</div>
        </div>

        <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--text-muted)' }}>
            <MessageSquareQuote size={20} color="#ec4899" />
            <span>Feedback mới</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>12</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Thống kê đánh giá sản phẩm */}
        <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Thống kê Đánh giá Sản phẩm</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockProducts.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={p.image} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>★ {p.rating}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({p.reviewCount} đánh giá)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tổng hợp Feedback gần đây */}
        <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Feedback Khách hàng mới nhất</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Nguyễn Văn A</span>
                <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>★★★★★</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>"Tai nghe dùng rất thích, bass ấm. Shop giao hàng cực nhanh, tư vấn nhiệt tình."</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Trần Thị B</span>
                <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>★★★★☆</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>"Bàn phím gõ êm, nhưng hộp hơi móp một chút. Nhìn chung hài lòng."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
