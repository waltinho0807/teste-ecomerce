import React from 'react';
import { Button, Segment, Divider, Form, Input } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';


const INITIAL_ORDER = {
    phone: "",
    email: "",
    address: ""
};

const CartSummary2 = ({ products, handleCheckout, success}) => {
    const [order, setOrder] = React.useState(INITIAL_ORDER);
    const [cartAmout, setCartAmaount] = React.useState(0);
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
         //console.log(order);
    }

    return (
        <React.Fragment>
            <Divider />
            <Segment clearing size="large" >
            <strong>Sub total:</strong> ${cartAmout}
                <Form onSubmit={handleCheckout}>
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
                    <Form.Button
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
    );
}

export default CartSummary2;