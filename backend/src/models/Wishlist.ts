import mongoose, { Schema, Document, Types } from 'mongoose';

interface IWishlist extends Document {
  userId: Types.ObjectId;
  product: Types.ObjectId;
  createdAt: Date;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    createdAt: { type: Date, default: Date.now }, // use default if not set manually
  },
  { timestamps: true } // optional: automatically manages createdAt and updatedAt
);

export default mongoose.model<IWishlist>('Wishlist', wishlistSchema);
