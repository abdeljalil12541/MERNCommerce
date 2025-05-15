import mongoose, { Schema, Document, Types } from 'mongoose';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CartProduct {
  productId: Types.ObjectId; // reference to Product
  quantity: number;
  selectedSize: string;
  // add any other fields from your cart product snapshot here if needed
}

interface IOrder extends Document {
  userId?: Types.ObjectId; // optional for guest users
  cartProducts: CartProduct[];
  customerInfo: CustomerInfo;
  paymentMethod: string;
  totalPrice: number;
  status: 'delivered' | 'upcoming' | 'canceled' | 'returned';
  createdAt?: Date;
}

const CustomerInfoSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  country: String,
  address: String,
  apartment: String,
  city: String,
  state: String,
  zipCode: String,
}, { _id: false });

const CartProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  selectedSize: { type: String, required: true },
  // add other fields if needed
}, { _id: false });

const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  cartProducts: { type: [CartProductSchema], required: true },
  customerInfo: { type: CustomerInfoSchema, required: true },
  paymentMethod: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['delivered', 'upcoming', 'canceled', 'returned'],
    default: 'upcoming',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
