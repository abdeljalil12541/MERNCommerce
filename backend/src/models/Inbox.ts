import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the status enum as a separate type to avoid duplication
type InboxStatus =
  | 'register'
  | 'orderDelivered'
  | 'orderUpcoming'
  | 'orderCanceled'
  | 'orderReturned'
  | 'review'
  | 'passwordChanged'
  | 'updatePersoInfos'
  | 'updateAddress'
  | 'updateCommunicationPreferences';

// Define the interface for the Inbox document
interface IInbox extends Document {
  user: mongoose.Schema.Types.ObjectId;
  status: InboxStatus;
  message: string;
}

// Define the schema
const inboxSchema = new Schema<IInbox>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: [
        'register',
        'orderDelivered',
        'orderUpcoming',
        'orderCanceled',
        'orderReturned',
        'review',
        'passwordChanged',
        'updatePersoInfos',
        'updateAddress',
        'updateCommunicationPreferences',
      ],
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create and export the model
export default mongoose.model<IInbox>('Inbox', inboxSchema);