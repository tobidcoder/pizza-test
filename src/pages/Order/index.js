import React from 'react';
import OrdersList from './OrderList';
import Header from '../../components/shared/header';
import Footer from '../../components/shared/footer';


export default function Orders(){
    return(
        <div className="mx-5">
            <Header />
            <OrdersList />
            <Footer />
        </div>
    )
}