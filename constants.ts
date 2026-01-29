
import { Product } from './types';

export interface ShopifyProduct extends Product {
  shopifyId?: string;
  shopifyGid?: string;
  variantId?: string;
  isUpcoming?: boolean;
}

export const PRODUCTS: ShopifyProduct[] = [
  {
    id: 'mini-juicer',
    shopifyId: '9382811566328',
    name: 'Mini Juicer and Blender',
    price: 49.99,
    compareAtPrice: 59.99,
    category: 'Beverage',
    description: 'Fresh smoothies, anytime, anywhere. This high-torque portable blender features 6-blade 3D extraction technology and a sleek, travel-ready design. BPA-free and USB-C rechargeable for the modern lifestyle.',
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1570197571499-166b36435e9f?auto=format&fit=crop&q=80&w=800'
    ],
    features: [
      '6-Blade Stainless Steel 3D Extraction',
      'High-Torque 22,000 RPM Motor',
      '4000mAh USB-C Rechargeable Battery',
      'BPA-Free Tritan Lightweight Bottle',
      'Sleek Minimalist Aesthetic'
    ],
    inStock: true
  },
  {
    id: 'capsule-coffee-machine',
    shopifyId: '9383960543480',
    name: 'Capsule Coffee Machine',
    price: 99.99,
    compareAtPrice: 129.99,
    category: 'Beverage',
    description: 'The ultimate morning ritual redefined. Our Capsule Coffee Machine combines high-pressure extraction with a minimalist aesthetic, delivering rich, café-quality espresso at the touch of a button. Designed for the modern kitchen.',
    image: 'https://images.unsplash.com/photo-1517668808822-9eaa02f2a9e0?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1517668808822-9eaa02f2a9e0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
    ],
    features: [
      '19-Bar High Pressure Pump',
      'Rapid 25-Second Heat-up System',
      'Two Programmable Cup Sizes',
      'Eco-Mode for Energy Efficiency',
      'Sleek Matte Finish'
    ],
    inStock: true
  },
  {
    id: 'veg-cutter',
    shopifyId: '9383213826296',
    name: 'Multifunctional Vegetable Cutter',
    price: 89.99,
    compareAtPrice: 119.99,
    category: 'Food Prep',
    description: 'Master the art of preparation. This multifunctional cutter streamlines your kitchen workflow with interchangeable precision blades. From perfect juliennes to uniform dicing, achieve chef-level results in seconds with absolute safety.',
    image: 'https://images.unsplash.com/photo-1606914469225-068942a357ed?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1606914469225-068942a357ed?auto=format&fit=crop&q=80&w=800'
    ],
    features: [
      '8 Interchangeable Stainless Steel Blades',
      'Non-Slip Ergonomic Safety Guard',
      'Integrated Prep Container (1.2L)',
      'BPA-Free Heavy-Duty Construction',
      'Easy-Clean Modular Design'
    ],
    inStock: true
  },
  {
    id: 'opener-sealer',
    shopifyId: '9383036584184',
    name: 'Opener and Sealer 2 in 1 machine',
    price: 59.99,
    compareAtPrice: 75.00,
    category: 'Food Prep',
    description: 'The ultimate kitchen multi-tool for freshness. This compact 2-in-1 device features a precision blade for effortless bag opening and a high-efficiency thermal element for airtight sealing.',
    image: 'https://images.unsplash.com/photo-1584263347416-85a18a4524a2?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1584263347416-85a18a4524a2?auto=format&fit=crop&q=80&w=800'
    ],
    features: [
      'Dual Function: Cut & Seal',
      'Magnetic Base for Easy Storage',
      'Rapid Heating Technology',
      'Ergonomic Handheld Design'
    ],
    inStock: false
  }
];

export const THEME = {
  primary: '#8B9D83', // Sage
  secondary: '#D4A373', // Sand
  background: '#0A0A0A', // Black
  surface: '#1A1A1A', // Dark Gray
  text: '#FAF9F6', // Off-white
  accent: '#E9EDC9', // Pale Lime
};
