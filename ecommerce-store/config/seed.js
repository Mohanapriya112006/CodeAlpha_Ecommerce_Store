// Run with: npm run seed
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('../models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Over-ear Bluetooth headphones with noise cancellation and 30-hour battery life.',
    price: 2499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 25
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
    price: 4999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    stock: 15
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton crew neck t-shirt, available in multiple colors.',
    price: 499,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    stock: 50
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with breathable mesh and cushioned sole.',
    price: 2999,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    stock: 30
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable drip coffee maker with 12-cup capacity.',
    price: 3499,
    category: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    stock: 10
  },
  {
    name: 'Backpack',
    description: 'Durable laptop backpack with multiple compartments and water resistance.',
    price: 1599,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    stock: 40
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} sample products`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
