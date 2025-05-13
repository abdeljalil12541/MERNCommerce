import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  sizes: string[]; // Changed from size to sizes (array)
  color: string;
  productType: string;
  regularPrice: number;
  currentPrice: number;
  discount: number;
  status: string;
  mainSrc: string;
  hoverSrc: string;
  variationImages: string[];
  date: string;
  ifBestSeller: boolean;
  category: mongoose.Types.ObjectId;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sizes: [
      {
        type: String,
        required: true,
        enum: ['XXS/Y12', 'XS/Y14', 'S', 'M', 'L', 'XL', '2XL', '3XL'], // Restrict to specified sizes
      },
    ], // Changed from size to sizes (array)
    color: { type: String, required: true },
    productType: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['NEW', 'DEAL', 'TRENDING', 'SOLD OUT'],
    },
    mainSrc: { type: String, required: true },
    hoverSrc: { type: String, required: true },
    variationImages: [{ type: String }],
    date: { type: String, required: true },
    ifBestSeller: { type: Boolean, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);