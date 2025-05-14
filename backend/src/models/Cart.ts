// backend/src/models/Cart.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

// Define interfaces for TypeScript
interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
  selectedSize: string;
}

interface ICart extends Document {
  userId: Types.ObjectId;
  products: ICartItem[];
  updatedAt: Date;
}

// Cart item schema
const cartItemSchema = new Schema<ICartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // References Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  selectedSize: {
    type: String,
    required: true,
    enum: ['XXS/Y12', 'XS/Y14', 'S', 'M', 'L', 'XL', '2XL', '3XL'], // Match Product.sizes
  },
});

// Cart schema
const cartSchema = new Schema<ICart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // References User model
    required: false,
  },
  products: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook with correct typing for 'next'
cartSchema.pre('save', function (this: ICart, next: mongoose.CallbackWithoutResultAndOptionalError) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<ICart>('Cart', cartSchema);