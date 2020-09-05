import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Config from '../../services/api.config';
import Table from 'react-bootstrap/Table';
import LoginReg from '../LoginRegister';
import { TokenService, SetUser } from '../../services/storage.service';
import { formatDollar, formartEuros } from '../../helpers/utils';
import GoBackButton from '../../components/shared/GoBackButton';
import  Headers  from '../../services/Header';
    
export default function OrdersList(){
    
    const [orders, setOrders] = useState([]);
    
    function getOrders(){
        axios.post(`${Config.baseUrl}/orders`, {
            user_id: TokenService.getUserId()
        }, Headers)
        .then((response) => {
            console.log(response.data.data);
          

            setOrders(response.data.data)
          
        }, (error) => {

          console.log(error);
          
        })
    }

    useEffect(() => {
        getOrders()
        
    }, [])

    return(
        <>
        <GoBackButton />
        <div className="text-center mt-5">
            <h1>Your Orders</h1>
            <p>This is the Orders Page.</p>
        </div>
        <Table  responsive>
           <thead>
            <tr>
            <th>#</th>
                <th>Order ID</th>
                <th>Item Count</th>
                <th>Phone Number</th>
                <th>Shhiping Address</th>
                <th>Shipping Fees</th>
                <th>Total Amount</th>
                <th>Action</th>      
            </tr>
            </thead>
            <tbody>
                {orders == undefined
            
                ?
                <tr>
                <td colSpan="5" className="text-center">No Order Yet! <Link to="/"><span style={{color: 'black'}}>Click Here to Add to Cart</span></Link></td>
                </tr>
                :
                orders.map((order) =>
                <tr  key={order.id}>  
                <td>#</td>
                <td>{order.order_id}</td>
                <td>{order.item_count}</td>
                <td>{order.phone_number}</td>
                <td>{order.shipping_address}</td>
                <th>{order.shipping_fees}</th>
                <td>{formatDollar(order.total_amount_in_dollars)} / {formartEuros(order.total_amount_in_euros)}</td> 
                <td><Link to={'/order/items/'+order.order_id}><button type='button'>View Item</button></Link></td>
                </tr>
                )
                }
                
                    
            
            </tbody>
        </Table>
        {SetUser.getUser() == null ? 
           <LoginReg />
           
            : 
            ''
        }
        </>
        
    )
}