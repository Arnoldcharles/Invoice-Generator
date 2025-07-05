import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  clientName: String,
  clientEmail: String,
  items: [{ description: String, quantity: Number, price: Number }],
  subtotal: Number,
  tax: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
