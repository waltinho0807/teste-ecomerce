import axios from 'axios';
import AllCustomers from "../../components/Customers/AllCustomers";
import AdminSidebar from '../../components/_App/AdminSidebar';
import baseUrl from '../../utils/baseUrl';

const Customers = ({ customers, user }) => {
    // console.log(customers)
    return (
        <AdminSidebar user={user}>
            <div className="create-new-products-area">
                <AllCustomers customers={customers} />
            </div>
        </AdminSidebar>
    );
}

Customers.getInitialProps = async () => {
    const url = `${baseUrl}/api/customers`;
    const response = await axios.get(url);

    return response.data
}
  
export default Customers;