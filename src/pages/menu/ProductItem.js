import React, { useContext } from 'react';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../components/icons'
import { CartContext } from '../../contexts/CartContext';
import { formatDollar, formartEuros } from '../../helpers/utils';
import { changeCurrency, useGlobalState } from '../../services/GlobalState';



const ProductItem = ({product}) => {

    const { addProduct, cartItems, increase, decrease, removeProduct } = useContext(CartContext);
   
    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }
    
    const [value, setValue] = useGlobalState('currency');
    console.log(value);
   
    return ( 
        <div className="card card-body">
            <img style={{display: "block", margin: "0 auto 10px", maxHeight: "400px"}} className="img-fluid" 
            src={product.photo + '?v=' + product.id} alt={product.name}/>
            <p>{product.name}</p>
            {value ?
             <h3 className="text-left">{formartEuros(product.price * 0.84)}</h3>
            :
           
            <h3 className="text-left">{formatDollar(product.price)}</h3>
            }
            <div className="text-right">
                {
                    isInCart(product) && 
                       <button 
                        onClick={() => increase(product)}
                        className="btn btn-primary btn-sm mr-2 mb-1">
                            <PlusCircleIcon width={"20px"}/>
                        </button>
                        

                }
                

                {
                    !isInCart(product) && 
                    <button 
                    onClick={() => addProduct(product)}
                    className="btn btn-primary btn-sm">Add to cart</button>
                    
                }
                
            </div>
        </div>
     );
}
 
export default ProductItem;