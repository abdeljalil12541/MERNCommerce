import mongoose, { Schema, Document, Types } from 'mongoose';
interface IRecentlyViewedProducts extends Document {
    userId: Types.ObjectId;
    product: Types.ObjectId;
}

const recentlyViewedProductsSchema = new Schema<IRecentlyViewedProducts>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  });

export default mongoose.model<IRecentlyViewedProducts>('RecentlyViewedProducts', recentlyViewedProductsSchema);