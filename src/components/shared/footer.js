import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';

const Footer = () => {
    return ( 
        <footer className={`${styles.footer}  mt-5 p-3`}>
            2020 &copy; Pizza Task <Link to="/about"> | About</Link>
        </footer>
     );
}
 
export default Footer;