import jwt from 'jsonwebtoken';
import Cart from '../../models/Cart';
import Order from '../../models/Order';
import calculateCartTotal from '../../utils/calculateCartTotal';


export default async (req, res) => {
    const { paymentData } = req.body;
     console.log(paymentData) 
    try {
        const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "products.product",
            model: "Product"
        });
        const {cartTotal} = calculateCartTotal(cart.products);
        console.log(userId);
        await new Order({
            user: userId,
            email: paymentData.email,
            address: paymentData.address,
            phone: paymentData.phone,
            total: cartTotal,
            products: cart.products
        }).save();

        await Cart.findOneAndUpdate(
            {_id: cart._id},
            {$set: {products: []}}
        )

        res.status(200).send("Checkout successful!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error proccessing charge");
        
    }
}