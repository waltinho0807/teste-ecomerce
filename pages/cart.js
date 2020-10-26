import React from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import cookie from 'js-cookie';
import { Segment, Divider, Form, Button } from 'semantic-ui-react';
import CartItemList from "../components/Cart/CartItemList"
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
import calculateCartTotal from '../utils/calculateCartTotal';

const INITIAL_ORDER = {
    phone: "",
    email: "",
    address: ""
};


const Cart = ({ products, user }) => {
     console.log(products)
    const [cartProducts, setCartProducts] = React.useState(products);
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [cartAmout, setCartAmaount] = React.useState(0);
    const [order, setOrder] = React.useState(INITIAL_ORDER);
    const [isCartEmpty, setCartEmpty] = React.useState(false);

    React.useEffect(() => {
        const { cartTotal } = calculateCartTotal(products);
        setCartAmaount(cartTotal);
        setCartEmpty(products.length === 0)
    }, [products]);

    const handleChanhe = e => {
        // console.log(d.value)
        const { name, value} = e.target;
        if(name === 'media'){
            setOrder(prevState => ({ ...prevState, media: files[0]}))
            setMediaPreview(window.URL.createObjectURL(files[0]));
        } else {
            setOrder(prevState => ({ ...prevState, [name]: value }));
        }
         console.log(order);
    }

    const handleRemoveFromCart = async (productId) => {
        const url = `${baseUrl}/api/cart`;
        const token = cookie.get("token");
        const payload = {
            params: {productId},
            headers: {Authorization: token}
        };
        const response = await axios.delete(url, payload);
        setCartProducts(response.data);
    }

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const url = `${baseUrl}/api/checkout2`;
            const token = cookie.get("token");
            const {phone, email, address} = order;
            const payload = {phone, email, address};
            const headers = {headers: {Authorization: token}};
            await axios.post(url, payload, headers);
            setOrder(INITIAL_ORDER);
            setSuccess(true);
        } catch (error) {
            catchErrors(error, window.alert);
            console.log(order)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="cart-area">
            <Segment loading={loading}>
                <CartItemList 
                    handleRemoveFromCart={handleRemoveFromCart}
                    user={user} 
                    products={cartProducts} 
                    success={success}
                />
                <React.Fragment>
            <Divider />
            <Segment clearing size="large" >
            <strong>Sub total:</strong> ${cartAmout}
                <Form success={success} onSubmit={handleCheckout}>
                    <Form.Input
                        fluid
                        icon="phone"
                        iconPosition="left"
                        label="Telefone"
                        placeholder="Tel"
                        name="phone"
                        type="text"
                        value={order.phone}
                        onChange={handleChanhe}
                    />
                    <Form.Input
                        fluid
                        icon="envelope"
                        iconPosition="left"
                        label="Email"
                        placeholder="e-mail"
                        name="email"
                        type="email"
                        value={order.email}
                        onChange={handleChanhe}
                    />
                    <Form.Input
                        fluid
                        icon="shipping"
                        iconPosition="left"
                        label="Rua e Numero"
                        placeholder="Rua e Nº"
                        name="address"
                        type="text"
                        value={order.address}
                        onChange={handleChanhe}
                    />
                    <Form.Field
                        control={Button}
                        type="submit"
                        icon="cart"
                        color="green"
                        floated="right"
                        content="Checkout"
                        disabled={isCartEmpty || success}
                    />
                </Form>
            </Segment>

        </React.Fragment>
            </Segment>
        </div>
    );
}

Cart.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx);
    if (!token){
        return { products: [] };
    }
    const url = `${baseUrl}/api/cart`;
    const payload = { headers: {Authorization: token} };
    const response = await axios.get(url, payload);
    return { products: response.data };
}

export default Cart;