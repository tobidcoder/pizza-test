import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Config from '../../services/api.config';
import Table from 'react-bootstrap/Table'
import Header from '../../components/shared/header';
import Footer from '../../components/shared/footer'
import { formatDollar, formartEuros } from '../../helpers/utils';
import LoginReg from '../LoginRegister';
import { TokenService, SetUser } from '../../services/storage.service';
import GoBackButton from '../../components/shared/GoBackButton';
import  Headers  from '../../services/Header';



export default function OrderView({match}){
   
    const [items, setItems] = useState([]);

    function getOrderItems(){
        axios.post(`${Config.baseUrl}/order/items`, {
            order_id: match.params.order_id,
            user_id: SetUser.getUser().user_id
        }, Headers )
        .then((response) => {
            console.log(response.data.data);
          

            setItems(response.data.data)
          
        }, (error) => {

          console.log(error);
          
        })
    }

    useEffect(() => {
        getOrderItems()
        
    }, [])


   console.log(items)

   const listOrders = items.map((item) =>
     <tr  key={item.id}>  
      <td>#</td>
      <td>{item.name}</td>
      <td>{formatDollar(item.price)} / {formartEuros(item.price * 0.84)}</td>
      <td> <img src={item.photo} className="rounded mr-2"style={{maxHeight: "30px"}} alt="" /></td>
      <td>{item.quantity}</td>
    </tr>
    );
    return(
        <>
       
        <Header />
        <GoBackButton />
        <div className="text-center mx-1">
            <h1>View Order Items </h1>
            <p>This is the View Order Items Page.</p>
        </div>
        <div className='mx-5'>
        <Table  responsive>
           <thead>
            <tr><th>ORDER ID: {match.params.order_id}</th></tr>
            <tr>
            <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Photo</th>
                <th>Quantity</th>       
            </tr>
            </thead>
            <tbody>
           
                {listOrders}
                {/* <tr>
                <th>total amount</th>
                </tr>
                <tr>
                <td>Items Count :{items.item_count}</td>
                </tr><tr>
                <td>Total Amount: {items.total_amount_in_dollars}</td>
                </tr>
                <tr>
                <td>Total Amount: {items.total_amount_in_euros}</td>
                </tr> */}
               
            </tbody>
        </Table>
        </div>
        {SetUser.getUser() == null ? 
           <LoginReg />
           
            : 
            ''
            }
        <Footer />
        </>
        
    )
}