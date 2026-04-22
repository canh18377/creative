import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { mockProducts, formatPrice } from '../../data/mockData';
import type { Product } from '../../types';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) return;

    const newProduct: Product = {
      id: `p${Date.now()}`,
      name,
      price: parseInt(price, 10),
      image,
      rating: 5.0,
      reviewCount: 0,
      description: 'Mô tả sản phẩm mới'
    };

    setProducts([newProduct, ...products]);
    setIsAdding(false);
    setName('');
    setPrice('');
    setImage('');
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div style={{ flex: 1, padding: '30px', background: 'rgba(15,23,42,0.8)', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Quản lý Sản phẩm</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          style={{ 
            background: 'var(--primary)', color: 'white', border: 'none', 
            padding: '10px 16px', borderRadius: '8px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <Plus size={18} /> {isAdding ? 'Hủy' : 'Thêm sản phẩm mới'}
        </button>
      </div>

      {isAdding && (
        <div className="glass" style={{ padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Thêm sản phẩm mới</h3>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tên sản phẩm</label>
              <input 
                type="text" 
                value={name} onChange={e => setName(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
                placeholder="VD: Bàn phím cơ..."
                required
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Giá bán (VNĐ)</label>
              <input 
                type="number" 
                value={price} onChange={e => setPrice(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
                placeholder="VD: 1500000"
                required
              />
            </div>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Link ảnh sản phẩm</label>
              <input 
                type="text" 
                value={image} onChange={e => setImage(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
                placeholder="https://..."
                required
              />
            </div>
            <button 
              type="submit" 
              style={{ padding: '10px 24px', borderRadius: '8px', background: 'var(--success)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, height: '42px' }}
            >
              Lưu
            </button>
          </form>
        </div>
      )}

      <div className="glass" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 500 }}>Sản phẩm</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 500 }}>Giá bán</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 500 }}>Đánh giá</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 500, width: '100px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={p.image} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                  <span style={{ fontWeight: 500 }}>{p.name}</span>
                </td>
                <td style={{ padding: '16px 20px', color: 'var(--success)', fontWeight: 600 }}>{formatPrice(p.price)}</td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#fbbf24' }}>★ {p.rating}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({p.reviewCount})</span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Edit size={18} /></button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
