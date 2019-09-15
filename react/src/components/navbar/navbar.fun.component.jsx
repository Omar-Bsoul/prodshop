import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import authentication from '../../services/authentication';
import NavLink from './../navlink/navlink.component';
import './navbar.styles.scss';

const Navbar = ({ auth, menuItems }) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [menus, setMenus] = useState([...menuItems]);

  const handleMenuToggle = () => {
    setMenuVisibility(!menuVisibility);
  };

  useEffect(
    authentication.authEffect(auth => {
      setMenus(
        menuItems.filter(item => {
          if (item.condition === 'auth') {
            return auth;
          } else if (item.condition === '!auth') {
            return !auth;
          } else {
            return true;
          }
        })
      );
    }, console.log),
    [auth]
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          ProdShop
        </Link>

        <span className="navbar-toggle no-select" onClick={handleMenuToggle}>
          <FontAwesomeIcon icon={faBars} />
        </span>

        <ul className={`navbar-items no-select ${menuVisibility ? 'navbar-items-expanded' : ''}`}>
          {menus.map(menu => (
            <NavLink menu={menu} key={menu.link} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
