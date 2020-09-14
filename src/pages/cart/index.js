import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import LoginReg from '../LoginRegister';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import CartProducts from './CartProducts';
import { CartContext } from '../../contexts/CartContext';
import { formartEuros, formatDollar } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import Config from '../../services/api.config';
import GoBackButton from '../../components/shared/GoBackButton';
import { TokenService, SetUser } from '../../services/storage.service';
import Headers from '../../services/Header';
import { useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import { changeCurrency, useGlobalState } from '../../services/GlobalState';



const Cart = () => {
    const history = useHistory();

    const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
    const { register, handleSubmit, watch, errors } = useForm();

    const [showAlert, setShowAlert] = useState(false);
    const [setShowAlertOders, setsetShowAlertOders] = useState(false)
    const [shippingFees, setShippingFees] = useState('')
    const [checkoutShow, setCheckoutShow] = useState(false)
    const userId = TokenService.getUserId()
    const [value, setValue] = useGlobalState('currency');

    const onSubmit = (data) => {

        axios.post(`${Config.baseUrl}/add-to-cart`,
            {
                user_id: userId,
                data,
                cartItems,
                total,
                itemCount,
                shippingFees
            }, Headers)

            .then((response) => {
                console.log(response);
                setsetShowAlertOders(true)
                clearCart()
                history.push("/orders");

            }, (error) => {
                console.log(error);
                setShowAlert(true)

            })


    }
    useEffect(() => {
        setShippingFees(itemCount * 1.2)
        setCheckoutShow(false)
        console.log(checkoutShow);
    }, [itemCount])

    return (

        <Layout title="Cart" description="This is the Cart page" >
            {showAlert ? <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>Success!</Alert.Heading>
                <p>
                    Something went wrong!
                </p>
            </Alert> : ''}

            {setShowAlertOders ? <Alert variant="success" onClose={() => setsetShowAlertOders(false)} dismissible>
                <Alert.Heading>Success!</Alert.Heading>
                <p>
                    Order place successful!
                </p>
            </Alert> : ''}
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
                                <CartProducts /> :
                                <div className="p-3 text-center text-muted">
                                    Your cart is empty
                            </div>
                        }

                        {checkout &&
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
                                {!value ?
                                    <div>
                                        <p className="mb-1">Total Payment in Dollar</p>
                                        <h3 className="m-0 txt-right">{formatDollar(total)}</h3>
                                    </div>
                                    :
                                    <div>
                                        <p className="mb-1">Total Payment in Euros</p>
                                        <h3 className="m-0 txt-right">{formartEuros(total * 0.84)}</h3>
                                    </div>
                                }
                                <hr className="my-4" />
                                {!value ?
                                    <h3 className="m-0 txt-right">{formatDollar(itemCount * 1.2)}</h3>
                                    :
                                    <h3 className="m-0 txt-right">{formartEuros(itemCount * 1.2 * 0.84)}</h3>
                                }
                                <p className="mb-1">Shipping Fees</p>

                                <hr className="my-4" />

                                <Form onSubmit={handleSubmit(onSubmit)} >

                                <Form.Group controlId="formBasicText">
                                <Form.Control type="text" name="currency" value={value ? '€' : '$'} ref={register({ required: true })}  placeholder="Phone Number" hidden />
                                {errors.currency && <span style={{color: 'red'}}>currency is required</span>}
                            
                                </Form.Group>

                                    {userId === null ?
                                        <div className="text-center">
                                            {checkoutShow ?
                                                <button type="button" onClick={() => setCheckoutShow(false)} className="btn btn-primary mb-2" >CHECKOUT</button>
                                                :
                                                <button type="button" onClick={() => setCheckoutShow(true)} className="btn btn-primary mb-2" >CHECKOUT</button>
                                            }
                                            <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                                        </div>
                                        :
                                        <div className="text-center">

                                            <button type="submit" className="btn btn-primary mb-2" >CHECKOUT</button>

                                            <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                                        </div>

                                    }
                                </Form>
                            </div>
                        </div>
                    }

                </div>
            </div>
            {checkoutShow ?
                <LoginReg data={[{ cartItems, total, itemCount, shippingFees }]} />

                :
                ''
            }

        </Layout>

    );
}

export default Cart;