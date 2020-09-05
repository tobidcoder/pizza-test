import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav'
import { CartContext } from '../../contexts/CartContext';
import {CartIcon} from '../icons';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import Button  from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { TokenService, SetUser } from '../../services/storage.service';

const Header = () => {

    const {itemCount} = useContext(CartContext);
    const pathName = window.location.pathname
    function Logout(){
        SetUser.removeUser()
        TokenService.removeToken()
        window.location.reload(false)
    }


    return ( 
        <div>
        <header className={styles.header}>
            <Nav fill variant="tabs" defaultActiveKey={pathName}>
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
                <Link to="/cart">  <Badge variant="light"><CartIcon/> {itemCount}</Badge> </Link>  
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