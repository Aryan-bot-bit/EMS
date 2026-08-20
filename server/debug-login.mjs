import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';

dotenv.config();
console.log('JWT present', !!process.env.JWT_SECRET);
console.log('MONGO present', !!process.env.MONGODB_URI);

await mongoose.connect(process.env.MONGODB_URI);
const user = await User.findOne({ email: 'aryantomar6084@gmail.com' }).lean();
console.log('USER', JSON.stringify(user, null, 2));
if (user) {
  const ok = await bcrypt.compare('admin123', user.password);
  console.log('PASSWORD_OK', ok);
}
await mongoose.disconnect();
