import React, { useContext, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../components/icons'
import { CartContext } from '../../contexts/CartContext';

import { formatDollar, formartEuros } from '../../helpers/utils';


const CartItem = ({product}) => {
    const [ShowAlertIncrease, setShowAlertIncrease] = useState(false);
    const { increase, decrease, removeProduct } = useContext(CartContext);

    
    return (
        <div>
        {ShowAlertIncrease ? 
            <div
               aria-live="polite"
               aria-atomic="true"
               style={{
                   position: 'relative',
                   minHeight: '100px',
               }}
               >
               <Toast
                  
                   style={{
                   position: 'absolute',
                   top: 0,
                   right: 0,
                   }}
                   onClose={() => setShowAlertIncrease(false)} show={ShowAlertIncrease} delay={800} autohide
               >
                   <Toast.Header>
                   <img src={product.photo} className="rounded mr-2"style={{maxHeight: "15px"}} alt="" />
                   <strong className="mr-auto"></strong>
                   <small>{product.name}</small>
                   </Toast.Header>
                   <Toast.Body>Added to cart.</Toast.Body>
               </Toast>
               </div>: '' }
        
               
          
            <Card style={{ width: '15rem',  margin: 10 }}>
            <Card.Img variant="top" src={product.photo} />
            <Card.Body>
                <Card.Title>  {product.name} </Card.Title>
                <Card.Text>
                Price: {formatDollar(product.price)} / {formartEuros(product.price * 0.84)} 
                Qty: {product.quantity}
                </Card.Text>
               
                <Button 
                 onClick={() => increase(product) & setShowAlertIncrease(true)}
                 className="btn btn-primary btn-sm mr-2 mb-1">
                     <PlusCircleIcon width={"20px"}/>
                 </Button>

                 {
                     product.quantity > 1 &&
                     <Button
                    onClick={() => decrease(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <MinusCircleIcon width={"20px"}/>
                    </Button>
                 }

                {
                     product.quantity === 1 &&
                     <Button
                    onClick={() => removeProduct(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"}/>
                    </Button>
                 }
               
            </Card.Body>
            </Card>
           
        </div>
        
     );
}
 
export default CartItem;