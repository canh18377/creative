import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice } from '../data/mockData';

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-price-row">
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        
        <div className="product-reviews">
          <Star size={16} fill="currentColor" className="star-icon" />
          <span>{product.rating}</span>
          <span>({product.reviewCount} đánh giá)</span>
        </div>
        
        <button className="btn-add-cart" onClick={() => onAddToCart(product)}>
          <ShoppingCart size={18} />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};
