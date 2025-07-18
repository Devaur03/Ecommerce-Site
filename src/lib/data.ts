import type { Product, Category, Review } from '@/types';

export const categories: Category[] = [
  { id: 1, name: 'Sofas', slug: 'sofas', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: 2, name: 'Chairs', slug: 'chairs', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: 3, name: 'Tables', slug: 'tables', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: 4, name: 'Beds', slug: 'beds', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400&h=400&auto=format&fit=crop' },
];

const sampleReviews: Review[] = [
    {
      id: 1,
      rating: 5,
      comment: "Absolutely love this sofa! It's so comfortable and looks amazing in my living room. The velvet is super soft.",
      author: "Emily R.",
      date: "2023-10-15",
    },
    {
      id: 2,
      rating: 4,
      comment: "Great quality for the price. It's a bit firm at first but has softened up nicely. The color is beautiful.",
      author: "John D.",
      date: "2023-09-22",
    },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Modern Velvet Sofa',
    description: 'A plush velvet sofa that combines modern design with classic comfort. Perfect for any contemporary living room.',
    price: 899.99,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&h=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1540574163024-58844f4b6199?q=80&w=600&h=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1567016432779-1fee84122170?q=80&w=600&h=600&auto=format&fit=crop'],
    category: 'sofas',
    specs: {
      Material: 'Velvet, Solid Wood Frame',
      Dimensions: '84"W x 35"D x 30"H',
      Color: 'Deep Blue',
    },
    stock: 15,
    reviews: sampleReviews,
  },
  {
    id: 2,
    name: 'Eames Lounge Chair',
    description: 'An iconic mid-century modern lounge chair and ottoman, offering unparalleled comfort and timeless style.',
    price: 1250.00,
    images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&h=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?q=80&w=600&h=600&auto=format&fit=crop'],
    category: 'chairs',
    specs: {
      Material: 'Leather, Molded Plywood',
      Dimensions: '32.75"W x 32.75"D x 32"H',
      Color: 'Black Leather, Walnut',
    },
    stock: 8,
    reviews: [
      { id: 3, rating: 5, comment: "A design classic for a reason. Worth every penny.", author: "Michael B.", date: "2023-11-01" }
    ],
  },
  {
    id: 3,
    name: 'Scandinavian Dining Table',
    description: 'A minimalist dining table crafted from solid oak, featuring clean lines and a natural finish. Seats up to six people.',
    price: 650.00,
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&h=600&auto=format&fit=crop'],
    category: 'tables',
    specs: {
      Material: 'Solid Oak',
      Dimensions: '72"L x 36"W x 30"H',
      Color: 'Natural Oak',
    },
    stock: 20,
    reviews: [],
  },
  {
    id: 4,
    name: 'Upholstered Platform Bed',
    description: 'A chic and comfortable platform bed with a tufted headboard, wrapped in a soft linen-blend fabric.',
    price: 799.00,
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&h=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1560185127-6ed189bf02a4?q=80&w=600&h=600&auto=format&fit=crop'],
    category: 'beds',
    specs: {
      Material: 'Linen-blend Fabric, Wood',
      Dimensions: '63"W x 85"L x 45"H (Queen)',
      Color: 'Light Gray',
    },
    stock: 12,
    reviews: [],
  },
  {
    id: 5,
    name: 'Leather Lawson Armchair',
    description: 'A classic armchair with supple top-grain leather and a sturdy hardwood frame. Ages beautifully over time.',
    price: 950.00,
    images: ['https://images.unsplash.com/photo-1616627780414-b6d16503de24?q=80&w=600&h=600&auto=format&fit=crop'],
    category: 'chairs',
    specs: {
      Material: 'Top-grain Leather',
      Dimensions: '40"W x 38"D x 34"H',
      Color: 'Caramel Brown',
    },
    stock: 10,
    reviews: [],
  },
  {
    id: 6,
    name: 'Industrial Coffee Table',
    description: 'A rustic coffee table combining a solid mango wood top with a sturdy iron base. Adds character to any living space.',
    price: 350.00,
    images: ['https://images.unsplash.com/photo-1554228422-7235a2a1a852?q=80&w=600&h=600&auto=format&fit=crop'],
    category: 'tables',
    specs: {
      Material: 'Mango Wood, Iron',
      Dimensions: '48"L x 24"W x 18"H',
      Color: 'Walnut Finish, Black Base',
    },
    stock: 25,
    reviews: [],
  },
  {
    id: 7,
    name: 'Modular Sectional Sofa',
    description: 'A versatile sectional sofa with movable modules to fit any room layout. Upholstered in a durable, stain-resistant fabric.',
    price: 1599.99,
    images: ['https://images.unsplash.com/photo-1493663284031-b7e33ef2d92a?q=80&w=600&h=600&auto=format&fit=crop'],
    category: 'sofas',
    specs: {
      Material: 'Performance Fabric',
      Dimensions: '120"W x 90"D x 32"H',
      Color: 'Charcoal Gray',
    },
    stock: 5,
    reviews: [],
  },
  {
    id: 8,
    name: 'Canopy Bed Frame',
    description: 'Create a statement with this elegant metal canopy bed. Its sleek, four-poster design adds a touch of romance and drama.',
    price: 950.00,
    images: ['https://images.unsplash.com/photo-1594895982297-849a63412599?q=80&w=600&h=600&auto=format&fit=crop'],
    category: 'beds',
    specs: {
      Material: 'Steel',
      Dimensions: '79"W x 83"L x 80"H (King)',
      Color: 'Matte Black',
    },
    stock: 7,
    reviews: [],
  },
];
