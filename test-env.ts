import dotenv from 'dotenv';
const result = dotenv.config();
console.log('dotenv.config result:', result);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set');
}

import 'dotenv/config';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set');
}
