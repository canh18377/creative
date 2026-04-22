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
    description: 'Chống ồn chủ động xuất sắc, pin 30 giờ.',
    reviews: [
      { id: 'r1', user: 'Hoàng Minh', rating: 5, comment: 'Đeo rất thoải mái, chống ồn tốt nhất trong tầm giá. Giao hàng nhanh!', date: '10/04/2026' },
      { id: 'r2', user: 'Ngọc Lan', rating: 5, comment: 'Pin trâu, xài cả tuần chưa hết. Vote 5 sao cho shop.', date: '05/04/2026' },
    ]
  },
  {
    id: 'p2',
    name: 'Bàn phím cơ Keychron K8 Pro (Khuyến mãi)',
    price: 1990000,
    originalPrice: 2800000,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 128,
    description: 'Bàn phím cơ không dây, hotswap, hỗ trợ QMK/VIA.',
    reviews: []
  },
  {
    id: 'p3',
    name: 'Chuột Logitech MX Master 3S',
    price: 2290000,
    originalPrice: 2490000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 512,
    description: 'Chuột không dây công thái học tốt nhất cho công việc.',
    reviews: []
  },
  {
    id: 'p4',
    name: 'Màn hình Dell UltraSharp U2723QE 4K',
    price: 12500000,
    originalPrice: 15000000,
    image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 89,
    description: 'Màn hình 27 inch 4K IPS Black, chuẩn màu đồ họa.',
    reviews: []
  },
  {
    id: 'p5',
    name: 'Loa Bluetooth Marshall Acton III',
    price: 6490000,
    originalPrice: 7990000,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 201,
    description: 'Loa bluetooth thiết kế cổ điển, âm thanh đặc trưng của Marshall.',
    reviews: []
  },
  {
    id: 'p6',
    name: 'Đồng hồ thông minh Apple Watch Series 9',
    price: 9990000,
    originalPrice: 11500000,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 856,
    description: 'Chip S9 siêu mạnh, tính năng Double Tap mới mẻ.',
    reviews: []
  },
  {
    id: 'p7',
    name: 'Sạc dự phòng Anker PowerCore 20000mAh',
    price: 890000,
    originalPrice: 1200000,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 1045,
    description: 'Dung lượng lớn, hỗ trợ sạc nhanh Power Delivery 20W.',
    reviews: []
  },
  {
    id: 'p8',
    name: 'Ổ cứng SSD Samsung 980 PRO 1TB PCIe 4.0',
    price: 2150000,
    originalPrice: 2800000,
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 423,
    description: 'Tốc độ đọc lên tới 7000MB/s, chuẩn PCIe 4.0 siêu tốc.',
    reviews: []
  },
  {
    id: 'p9',
    name: 'Đế tản nhiệt Laptop Cooler Master',
    price: 550000,
    originalPrice: 850000,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 87,
    description: 'Quạt tản nhiệt mạnh mẽ, có LED RGB, phù hợp laptop gaming.',
    reviews: []
  },
  {
    id: 'p10',
    name: 'Micro thu âm Rode NT-USB Mini',
    price: 2690000,
    originalPrice: 3200000,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 156,
    description: 'Microphone condenser cổng USB, chất lượng thu âm studio.',
    reviews: []
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
