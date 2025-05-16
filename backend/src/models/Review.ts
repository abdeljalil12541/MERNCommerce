import mongoose, { Schema, Document, Types } from 'mongoose';
interface IReview extends Document {
    product: Types.ObjectId;
    reviewCount: number;
    reviewTitle: string;
    reviewDescription: string;
    image: string;
}

const reviewSchema = new Schema<IReview>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    reviewCount: { type: Number, required: true },
    reviewTitle: { type: String, required: true },
    reviewDescription: { type: String, required: true },
    image: { type: String, required: true },
  });

export default mongoose.model<IReview>('Review', reviewSchema);