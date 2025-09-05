import mongoose, { Document, Schema, Types } from "mongoose";

export interface IOrder extends Document {
  _id: Types.ObjectId;
  createdAt: Date;
  customerId: string;
  items: { productId: string; quantity: number }[];
  restaurantId: Types.ObjectId;
  status: "DELIVERED" | "OUT_FOR_DELIVERY" | "PREPARING" | "RECEIVED";
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    customerId: { required: true, type: String },
    items: [
      {
        productId: { required: true, type: String },
        quantity: { required: true, type: Number }
      }
    ],
    restaurantId: { ref: "Restaurant", required: true, type: Schema.Types.ObjectId },
    status: {
      default: "RECEIVED",
      enum: ["RECEIVED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"],
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
