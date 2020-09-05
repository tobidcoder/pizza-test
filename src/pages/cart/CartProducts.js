import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import CardGroup from 'react-bootstrap/CardGroup';

import CartItem from './CartItem';
import styles from './CartProducts.module.scss';


const CartProducts = () => {

    const { cartItems } = useContext(CartContext);

    return ( 
        <div className={styles.p__container}>
            <CardGroup>

                {
                    cartItems.map(product =>  <CartItem key={product.id} product={product}/>)
                }

           </CardGroup>
        </div>

     );
}
 
export default CartProducts;