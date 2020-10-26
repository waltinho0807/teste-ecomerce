import axios from 'axios';
import ProductSummary from '../../components/Product/ProductSummary';
import ProductAttributes from '../../components/Product/ProductAttributes';
import baseUrl from '../../utils/baseUrl';
import ProductDetailsTab from '../../components/Product/ProductDetailsTab';
import RelatedProducts from '../../components/Product/RelatedProducts';

const Product = ({ product, related, user }) => {
    // console.log(related)
    return (
        <div className="products-details-area">
            <ProductSummary user={user} {...product} />
            <ProductAttributes user={user} {...product}/>
            <ProductDetailsTab user={user} {...product} />
            <RelatedProducts related={related} />
        </div>
    );
}

Product.getInitialProps = async ({ query: {id} }) => {
    // console.log(id)
    const url = `${baseUrl}/api/product`;
    const payload = { params: { id } }
    const response = await axios.get(url, payload);
    // console.log(response)
    return {
        product: response.data.product, 
        related: response.data.related
    }
}

export default Product;