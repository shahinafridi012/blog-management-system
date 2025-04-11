import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;
const db = process.env.DATABASE_URL as string;

async function main() {
  try {
    await mongoose.connect(db);
    console.log('🛢️  DB connected');
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to DB', err);
  }
}

main();
