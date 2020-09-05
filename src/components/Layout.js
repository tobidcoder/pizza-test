import React from 'react';
import Header from './shared/header';
import Footer from './shared/footer';

import { Helmet } from 'react-helmet-async';

import 'bootswatch/dist/lux/bootstrap.css'

const Layout = ({title, description, children}) => {
    return ( 
        <>
        <Helmet>
            <title>{ title ? title + " - Pizza Task App" : "By Odejinmi Tobiloba" }</title>
            <meta name = "description" content={ description || "By Odejinmi Tobiloba" } />
        </Helmet>
        <Header/>
        <main className="container">
            {children}
        </main>
        <Footer/>
        </>
     );
}
 
export default Layout;