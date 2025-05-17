import mongoose, { Schema, Document, Types } from 'mongoose';
interface IReview extends Document {
    user: Types.ObjectId;
    product: Types.ObjectId;
    reviewCount: number;
    reviewTitle: string;
    reviewDescription?: string;
    image?: string;
}

const reviewSchema = new Schema<IReview>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    reviewCount: { type: Number, required: true },
    reviewTitle: { type: String, required: true },
    reviewDescription: { type: String, required: false },
    image: { type: String, required: false },
  });

export default mongoose.model<IReview>('Review', reviewSchema);