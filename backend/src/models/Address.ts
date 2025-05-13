import mongoose from 'mongoose';

interface IAddress extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  createdAt?: Date;
}

const addressSchema = new mongoose.Schema<IAddress>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: false, trim: true, default: '' }, // Changed to required: false
  street: { type: String, required: false, trim: true, default: '' },
  city: { type: String, required: false, trim: true, default: '' },
  postalCode: { type: String, required: false, trim: true, default: '' },
  phone: { type: String, required: false, trim: true, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// At the end of your Address.ts file
const Address = mongoose.model<IAddress>('Address', addressSchema);
export default Address;