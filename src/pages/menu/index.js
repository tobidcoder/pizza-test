import React from 'react';
import Layout from '../../components/Layout';
import ProductsGrid from './ProductsGrid';


const Store = () => {
    
    return ( 
        <Layout title="Store" description="This is the Store page" >
            <div >
                <div className="text-center mt-5">
                    <h1>Menu</h1>
                    <p>Pizza Menu.</p>
                </div>
                <ProductsGrid/>
            </div>
        </Layout>
     );
}
 
export default Store;