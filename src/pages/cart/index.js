import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import LoginReg from '../LoginRegister';
import Form from 'react-bootstrap/Form';
import CartProducts from './CartProducts';
import { CartContext } from '../../contexts/CartContext';
import { formartEuros, formatDollar } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import { TokenService, SetUser } from '../../services/storage.service';


const Cart = () => {

    const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
    
    return ( 
       
        <Layout title="Cart" description="This is the Cart page" >
            
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
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

                                <Form>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Shipping Address</Form.Label>
                                        <Form.Control as="textarea" rows="2" />
                                    </Form.Group>
                                  
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>CHECKOUT</button>
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