import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './home.module.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios  from 'axios';
import { CartContext } from '../contexts/CartContext';
import Alert from 'react-bootstrap/Alert';
import Config from '../services/api.config';
import { TokenService, SetUser } from '../services/storage.service';
import  Headers  from '../services/Header';
import Spinner from 'react-bootstrap/Spinner'
import { changeCurrency, useGlobalState } from '../services/GlobalState';

export default function LoginRegister(data) {
    const history = useHistory();
   
    const [show, setShow] = useState(true);
    const [login, setLogin] =useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useGlobalState('currency');

    const [showAlert, setShowAlert] = useState(false);
    const [ShowAlertReg, setShowAlertReg] = useState(false)
    const [ShowAlertLogin, setShowAlertLogin] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogin = () => setLogin(false);
    const handleRegister = () => setLogin(true);

    const { clearCart, checkout, handleCheckout } = useContext(CartContext);


    const userId = TokenService.getUserId()

    const { register, handleSubmit, watch, errors } = useForm();
    console.log(data.data[0].cartItems)
    console.log(data.data[0].total)
    console.log(data.data[0].itemCount);
    console.log(data.data[0].shippingFees);

    const cartItems = data.data[0].cartItems
    const total = data.data[0].total
    const itemCount = data.data[0].itemCount
    const shippingFees = data.data[0].shippingFees
    
    const onSubmit = (data) => {
      setLoading(true);
      {data.name ?
      
        axios.post(`${Config.baseUrl}/add-to-cart`, {
          data,
          cartItems,
          total,
          itemCount,
          shippingFees
        }, Headers)
        .then((response) => {
          setShowAlertLogin(true)
          clearCart()
          console.log(response);
          SetUser.saveUser(response.data.data);
          TokenService.saveToken(response.data.data.token)
          TokenService.saveUserId(response.data.data.user_id)
          history.push("/orders");
          // window.location.reload(false)
        }, (error) => {

          console.log(error);
          setShowAlertReg(true)
        })
        .finally(function () {
          setLoading(false);
        })
      
      :
      axios.post(`${Config.baseUrl}/add-to-cart`,{
        data,
        cartItems,
        total,
        itemCount,
        shippingFees
      }, Headers)
      .then((response) => {
        clearCart()
        setShowAlertLogin(true)
        SetUser.saveUser(response.data.data);
        TokenService.saveToken(response.data.data.token)
        TokenService.saveUserId(response.data.data.user_id)
        history.push("/orders");
        // window.location.reload(false)

      }, (error) => {
        console.log(error);
        setShowAlert(true)
        
      })
      .finally(function () {
        setLoading(false);
      })
    }
     
    }
   
    return (
      <>
        
        <Modal
          show={show}
          onHide={handleClose}
          // backdrop="static"
          keyboard={true}
        >
         
         {ShowAlertLogin ? <Alert variant="success" onClose={() => setShowAlertLogin(false)} dismissible>
          <Alert.Heading>Success!</Alert.Heading>
          <p>
            You have success login, Place your orders Now!
        </p>
        </Alert> : '' }
        
          <Modal.Header >
          <Button variant="link" type="link">
               <Link to="/"> Go TO MENU </Link>
         </Button>
            <Modal.Title>
                {login ? 'Login & Checkout' : 'Register & Checkout'}
            </Modal.Title>
          </Modal.Header>
          {showAlert ? 
             <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
             <Alert.Heading>Oh snap!</Alert.Heading>
             <p>
                Email or password is not correct!
              </p>
              </Alert>
           : ''  }
          {ShowAlertReg ? 
             <Alert variant="danger" onClose={() => setShowAlertReg(false)} dismissible>
             <Alert.Heading>Oh snap!</Alert.Heading>
             <p>
                Email have been taken!
              </p>
              </Alert>
           : ''  }     
          <Modal.Body>
          {loading ?
          <Spinner animation="grow" /> : ''}
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            {login ? 
            ''
            : 
            <>
            <Form.Group controlId="formBasicText">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" ref={register({ required: true })}  placeholder="Full Name" />
            {errors.name && <span style={{color: 'red'}}>Name field is required</span>}
            <Form.Text className="text-muted" >
                Pleased enter your full name
            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicText">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phone_number" ref={register({ required: true })}  placeholder="Phone Number" />
            {errors.phone_number && <span style={{color: 'red'}}>Phone Number field is required</span>}
            <Form.Text className="text-muted" >
                Pleased enter your Phone Number
            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicText">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control as="textarea" name="address" ref={register({ required: true })}  placeholder="Shipping Address" rows="2" />
            {errors.phone_number && <span style={{color: 'red'}}>Phone Number field is required</span>}
            <Form.Text className="text-muted" >
                Pleased enter your Phone Number
            </Form.Text>
            </Form.Group>
            </>
            }
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" 
                    ref={register({
                      required: "Enter your e-mail",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Enter a valid e-mail address",
                      },
                    })}
                    />
                {errors.email && <span style={{color: 'red'}}>Email field is required</span>}
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

           
            <Form.Group controlId="formBasicText">
            <Form.Control type="text" name="currency" value={value ? '€' : '$'} ref={register({ required: true })}  placeholder="Phone Number" hidden />
            {errors.currency && <span style={{color: 'red'}}>currency is required</span>}
           
            </Form.Group>
           
            

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" 
                 ref={register({
                  required: 'Minimum of 6 characters',
                  minLength: 6,
                })}
                style={{ borderColor: errors.password && "red" }}
                 />
                {errors.password && <span style={{color: 'red'}} >Password must be at least 6 characters!</span>}
            </Form.Group>
            {login ? 
                
                <Button variant="primary"  disabled={loading}
                
                
                type="submit">
                     {!loading ? (
                <span> Sign In & Place Order </span>
              ) : (
                <Spinner animation="border" variant='light' role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
                </Button>
                
                :
               <Button variant="primary" type="submit">
                Register & Place Order
                </Button>
               
                }
           
            {login ?
            <div>
             <p onClick={handleLogin} className={styles.auth}>
                 Do not have account  Register.
             </p>
             </div>
            :
            <div>
            <p onClick={handleRegister} className={styles.auth}>
               Already Have account Login 
             </p>
             </div>
            }
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  