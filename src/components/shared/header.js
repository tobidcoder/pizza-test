import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav'
import { CartContext } from '../../contexts/CartContext';
import {CartIcon} from '../icons';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import Button  from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const Header = () => {

    const {itemCount} = useContext(CartContext);
    const pathName = window.location.pathname
    return ( 
        <div>
        <header className={styles.header}>
            <Nav fill variant="tabs" defaultActiveKey={pathName}>
            <Nav.Item>
                <Link to="/">Menu</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/cart">  <Badge variant="light"><CartIcon/> {itemCount}</Badge> </Link>  
            </Nav.Item>
            </Nav>
        </header>
        </div>
     );
}
 
export default Header;