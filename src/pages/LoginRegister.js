import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './home.module.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios  from 'axios';
import Alert from 'react-bootstrap/Alert';
import Config from '../services/api.config';
import { TokenService, SetUser } from '../services/storage.service';

export default function LoginRegister() {
    const [show, setShow] = useState(true);
    const [login, setLogin] =useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [ShowAlertReg, setShowAlertReg] = useState(false)
    const [ShowAlertLogin, setShowAlertLogin] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogin = () => setLogin(false);
    const handleRegister = () => setLogin(true);

  
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (data) => {
      
      {data.name ?
      
        axios.post(`${Config.baseUrl}/register`, data)
        .then((response) => {
          setShowAlertLogin(true)
          SetUser.saveUser(response.data.data);
          TokenService.saveToken(response.data.data.token)
          TokenService.saveUserId(response.data.data.user_id)
          window.location.reload(false)
        }, (error) => {

          console.log(error);
          setShowAlertReg(true)
        })
      
      :
      axios.post(`${Config.baseUrl}/login`, data)
      .then((response) => {
        setShowAlertLogin(true)
        SetUser.saveUser(response.data.data);
        TokenService.saveToken(response.data.data.token)
        TokenService.saveUserId(response.data.data.user_id)
        window.location.reload(false)

      }, (error) => {
        console.log(error);
        setShowAlert(true)
        
      })
    }
     
    }
   
    return (
      <>
     
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
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
                {login ? 'Login' : 'Register'}
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            {login ? 
            ''
            : 
            <Form.Group controlId="formBasicText">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" ref={register({ required: true })}  placeholder="Full Name" />
            {errors.name && <span style={{color: 'red'}}>Name field is required</span>}
            <Form.Text className="text-muted" >
                Pleased enter your full name
            </Form.Text>
            </Form.Group>
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
                
                <Button variant="primary" type="submit">
                    Login
                </Button>
                
                :
               <Button variant="primary" type="submit">
                Register
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
  