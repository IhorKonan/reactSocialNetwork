import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../img/logo.png';
import s from './Header.module.css';

const Header = (props) =>{
    return(
        <header className={s.header}>
        <img src={logo} alt='logo'></img>
        <div className={s.loginBlock}>
          {props.isAuth ? props.login 
            : <NavLink to='/login'>Login</NavLink>}
        </div>
      </header>
    );
}

export default Header;