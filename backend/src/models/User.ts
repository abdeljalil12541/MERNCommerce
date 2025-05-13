import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// user.ts
interface IUser extends mongoose.Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  newsLetter?: 'receive' | 'unsubscribe';
  isAdmin?: boolean;
  createdAt?: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  newsLetter: {
    type: String,
    enum: ['receive', 'unsubscribe'],
    default: 'unsubscribe',
  },
  // REMOVED THE addresses FIELD
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  console.log('Provided:', candidatePassword, 'Stored:', this.password);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log('Match:', isMatch);
  return isMatch;
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;