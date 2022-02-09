import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
    },
    userName: {
      type: String,
    },
    totalAmount: {
      type: Number,
    },
    createTime: {
      type: Date,
    },
    items: [
      {
        courseId: { type: mongoose.Types.ObjectId, ref: 'PublishedCourse' },
        courseTitle: { type: String },
        price: { type: Number },
      },
    ],
    paypalOrderId: { type: String },
    paypalLink: { type: String },
    paypalStatus: { type: String },
    paypalPayer: {},
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
