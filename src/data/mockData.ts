import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Tai nghe Bluetooth Sony WH-1000XM5',
    price: 6990000,
    originalPrice: 8500000,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 342,
    description: 'Chống ồn chủ động xuất sắc, pin 30 giờ.'
  },
  {
    id: 'p2',
    name: 'Bàn phím cơ Keychron K8 Pro',
    price: 2350000,
    originalPrice: 2800000,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 128,
    description: 'Bàn phím cơ không dây, hotswap, hỗ trợ QMK/VIA.'
  },
  {
    id: 'p3',
    name: 'Chuột Logitech MX Master 3S',
    price: 2490000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 512,
    description: 'Chuột không dây công thái học tốt nhất cho công việc.'
  },
  {
    id: 'p4',
    name: 'Màn hình Dell UltraSharp U2723QE',
    price: 13500000,
    originalPrice: 15000000,
    image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 89,
    description: 'Màn hình 27 inch 4K IPS Black, chuẩn màu đồ họa.'
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
