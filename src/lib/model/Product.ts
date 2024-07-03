import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    id: { type: Number, required: true },
    img: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    quanty: { type: Number, required: true },
    aosDelay: { type: String, required: true },
    workPhotoPaths: [{
        id: { type: String, required: true },
        url: { type: String, required: true }
    }]
});

const Product = models.Product || model('Product', ProductSchema);
export default Product;
