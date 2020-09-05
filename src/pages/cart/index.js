import React, { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import LoginReg from '../LoginRegister';
import Form from 'react-bootstrap/Form';
import { useForm  } from 'react-hook-form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import CartProducts from './CartProducts';
import { CartContext } from '../../contexts/CartContext';
import { formartEuros, formatDollar } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import Config from '../../services/api.config';
import GoBackButton from '../../components/shared/GoBackButton';
import { TokenService, SetUser } from '../../services/storage.service';
import  Headers  from '../../services/Header';
import { useHistory } from "react-router-dom";




const Cart = () => {
    const history = useHistory();

    const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
    const { register, handleSubmit, watch, errors } = useForm();

    const [showAlert, setShowAlert] = useState(false);
    const [setShowAlertOders, setsetShowAlertOders] = useState(false)
    
    const userId = TokenService.getToken()

    const onSubmit = (data) => {
        
        axios.post(`${Config.baseUrl}/add-to-cart`, 
            {
                data,
                cartItems,
            }, Headers)
        
        .then((response) => {
         setsetShowAlertOders(true)
          clearCart()
          history.push("/orders");

        }, (error) => {
          console.log(error);
          setShowAlert(true)
          
        })
   
       
      }
    
    return ( 
       
        <Layout title="Cart" description="This is the Cart page" >
             {showAlert ? <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>Success!</Alert.Heading>
                <p>
                    Something went wrong!
                </p>
                </Alert> : '' }

                {setShowAlertOders ? <Alert variant="success" onClose={() => setsetShowAlertOders(false)} dismissible>
                <Alert.Heading>Success!</Alert.Heading>
                <p>
                   Order place successful!
                </p>
                </Alert> : '' }
            <div >
            <GoBackButton />
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-1 md-col-12">
                        {
                            cartItems.length > 0 ?
                            <CartProducts/> :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                            </div>
                        }

                        { checkout && 
                            <div className="p-3 text-center text-success">
                                <p>Checkout successfull</p>
                                <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                            </div>
                        }
                    </div>
                    {
                        cartItems.length > 0 && 
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                                <p className="mb-1">Total Payment in Dollar</p>
                                <h3 className="m-0 txt-right">{formatDollar(total)}</h3>
                                <p className="mb-1">Total Payment in Euros</p>
                                <h3 className="m-0 txt-right">{formartEuros(total*0.84)}</h3>
                                <hr className="my-4"/>

                                <Form onSubmit={handleSubmit(onSubmit)} >
                                    <Form.Control type="text" name="total_amount_in_dollars" value={total} ref={register({ required: true })} hidden/>
                                    <Form.Control type="text" name="total_amount_in_euros" value={(total*0.84).toFixed(2)} ref={register({ required: true })} hidden/>
                                    <Form.Control type="text" name="user_id" value={userId} ref={register({ required: true })} hidden/>
                                    <Form.Control type="text" name="item_count" value={itemCount} ref={register({ required: true })} hidden/>

                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label >Shipping Address</Form.Label>
                                        <Form.Control as="textarea" name="address" ref={register({ required: true })}  rows="2" />
                                          {errors.address && <span style={{color: 'red'}}>Address field is required</span>}
                                    </Form.Group>
                                  
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary mb-2" >CHECKOUT</button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                                </div>
                                </Form>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
         {SetUser.getUser() == null ? 
           <LoginReg />
           
            : 
            ''
            }
           
        </Layout>
        
     );
}
 
export default Cart;