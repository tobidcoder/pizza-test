import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav'
import { CartContext } from '../../contexts/CartContext';
import {CartIcon} from '../icons';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { TokenService, SetUser } from '../../services/storage.service';
import { changeCurrency, useGlobalState } from '../../services/GlobalState';

const Header = () => {

    const {itemCount} = useContext(CartContext);
    const pathName = window.location.pathname
    
    function Logout(){
        TokenService.removeAllItems()
        window.location.reload(false)
    }
    
    const [value, setValue] = useGlobalState('currency');
     console.log(value);
    return ( 
        <div>
        <header sticky="top" className={styles.header}>
            <Nav  fill variant="tabs" defaultActiveKey={pathName}>
            <img onClick={() =>setValue(false)} style={{display: "block", margin: "0 auto 10px", maxHeight: "30px", cursor: 'pointer', color: 'blue'} } className="img-fluid"  src={value ?'/img/d.png' : '/img/dred.png'} alt="Dollars"/>
            <img onClick={() =>setValue(true)} style={{display: "block", margin: "0 auto 10px", maxHeight: "30px", cursor: 'pointer'}}  className="img-fluid"  src={value ? '/img/ered.png' : '/img/e.png'} alt="Dollars"/>
            <Nav.Item>
                <Link to="/">Menu</Link>
            </Nav.Item>
            {SetUser.getUser() == null ? 
                ''           
            : 
            <Nav.Item>
                <Link to="/orders">Order</Link>
            </Nav.Item>
            }
           
            <Nav.Item>
                <Link to="/cart">  <Badge className={styles.count} variant="light"><CartIcon/> <sup>{itemCount}</sup></Badge> </Link>  
            </Nav.Item>
            {SetUser.getUser() == null ? 
                ''           
            : 
            <Nav.Item>
            <Link onClick={Logout} variant="light">Logout</Link>
          </Nav.Item>
            }
            
            </Nav>
        </header>
        </div>
     );
}
 
export default Header;