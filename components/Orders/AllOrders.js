import { Header, Accordion, Label, Segment, Icon, Button, List, Image } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import OrderStatus from './OrderStatus';

const AllOrders = ({ orders }) => {
     console.log(orders)
    const router  = useRouter();

    const mapOrdersToPanels = (orders) => {
        return orders.map(order => ({
            key: order._id,
            title: {
                content: (
                    <OrderStatus order={order} />
                )
            },
            content: {
                content: (
                    <>
                        <List.Header as="h3">
                            Total: ${order.total}
                            <Label 
                                content={order.address}
                                basic
                                horizontal
                                style={{marginLeft: '1em'}}
                            />
                            <Label 
                                content={order.email}
                                icon="mail"
                                basic
                                horizontal
                                style={{marginLeft: '1em'}}
                            />
                        </List.Header>
                        <List>
                            {order.products.map(p => (
                                <List.Item key={p.product._id}>
                                    <Image avatar src={p.product.mediaUrl} />
                                    <List.Content>
                                        <List.Header>
                                            {p.product.name}
                                        </List.Header>
                                        <List.Description>
                                            {p.quantity} x ${p.product.price}
                                        </List.Description>
                                    </List.Content>
                                    <List.Content floated="right">
                                        <Label tag color="red" size="tiny">
                                            {p.product.sku}
                                        </Label>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </>
                )
            }
        }))
    }
    return (
        <>
            <Header as="h2">
                <Icon name="folder open" />
                Orders
            </Header>
            {orders.length === 0 ? (
                <Segment inverted tertiary color="pink" textAlign="center">
                    <Header icon>
                        <Icon name="copy outline" />
                        No Past Orders.
                    </Header>
                    <Button onClick={() => router.push('/products')} color="violet">
                        View Products
                    </Button>
                </Segment>
            ) : (
                <Accordion 
                    fluid
                    styled
                    exclusive={false}
                    panels={mapOrdersToPanels(orders)}
                />
            )}
        </>
    );
}

export default AllOrders;
