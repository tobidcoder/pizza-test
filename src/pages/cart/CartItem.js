import React, { useContext, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../components/icons'
import { CartContext } from '../../contexts/CartContext';
import { changeCurrency, useGlobalState } from '../../services/GlobalState';


import { formatDollar, formartEuros } from '../../helpers/utils';


const CartItem = ({product}) => {
    const [ShowAlertIncrease, setShowAlertIncrease] = useState(false);
    const { increase, decrease, removeProduct } = useContext(CartContext);
    const [value, setValue] = useGlobalState('currency');
    
    return (
        <div>             
          
            <Card style={{ width: '15rem',  margin: 10 }}>
            <Card.Img variant="top" src={product.photo} />
            <Card.Body>
                <Card.Title>  {product.name} </Card.Title>
                <Card.Text>
                {value ?    
                <Card.Text>  Price: {formartEuros(product.price * 0.84)}  </Card.Text>
                :
                <Card.Text>  Price: {formatDollar(product.price)}  </Card.Text>
                } 
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