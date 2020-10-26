import '../public/semantic.min.css';
import '../public/nprogress.css';
import '../public/styles.css';
import '../public/responsive.css';
import App from "next/app";
import axios from 'axios';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import Layout from "../components/_App/Layout";
import { redirectUser } from '../utils/auth';
import baseUrl from '../utils/baseUrl';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }){
        const { token } = parseCookies(ctx);
        
        let pageProps = {};

        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx)
        }

        if(!token){
            const isProtectedRoute = ctx.pathname === '/profile' 
            || ctx.pathname === '/admin/add-product'
            || ctx.pathname === '/my-orders-history'
            || ctx.pathname === '/admin/users'
            || ctx.pathname === '/admin/dashboard'
            if(isProtectedRoute){
                redirectUser(ctx, '/auth/login');
            }
        } else {
            try {
                const payload = { headers: { Authorization: token } };
                const url = `${baseUrl}/api/account`;
                const response = await axios.get(url, payload);
                const user = response.data;
                const isRoot = user.role == 'root';
                const isAdmin = user.role == 'admin';
                // if authenticated but not root or admin
                const isNotPermitted = !(isRoot || isAdmin) && (ctx.pathname === '/admin/add-product' || ctx.pathname === '/admin/customers' || ctx.pathname === '/admin/orders' || ctx.pathname === '/admin/dashboard');
                if(isNotPermitted){
                    redirectUser(ctx, '/products');
                }
                pageProps.user = user;
            } catch (error) {
                // console.error("Error getting current user", error);
                //invalid token
                destroyCookie(ctx, "token");
                redirectUser(ctx, '/auth/login');
            }
        }

        return { pageProps }
    }

    componentDidMount(){
        window.addEventListener('storage', this.syncLogout);
    }

    syncLogout = e => {
        if(e.key === 'logout'){
            Router.push('/');
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Layout {...pageProps}>
                <Component {...pageProps}/>
            </Layout>
        );
    }
}

export default MyApp;
