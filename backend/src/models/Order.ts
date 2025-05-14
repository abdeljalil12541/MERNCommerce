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

interface IOrder extends Document {
  userId?: Types.ObjectId; // optional for guest users
  cartProducts: Types.ObjectId[]; // assuming you store product IDs
  customerInfo: CustomerInfo;
  paymentMethod: string;
  totalPrice: number;
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
  
  const OrderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    cartProducts: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    customerInfo: { type: CustomerInfoSchema, required: true },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
  }, { timestamps: true });
  
  export default mongoose.model<IOrder>('Order', OrderSchema);
  