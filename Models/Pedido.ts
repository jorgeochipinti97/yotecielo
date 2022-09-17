import mongoose, { Schema, model, Model } from 'mongoose';
import { pedido } from '../interfaces';

const pedidoSchema = new Schema({
    name: { type: String },
    email: { type: String },
    transactionId: { type: String, unique: true },
    message: { type: String },
    isQrDownload: { type: Boolean, default: false },
    images: [{ type: String }],
}, {
    timestamps: true,
})

const Pedido: Model<pedido> = mongoose.models.Pedido || model('Pedido', pedidoSchema);

export default Pedido;