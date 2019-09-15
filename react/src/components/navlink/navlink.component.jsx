import React from 'react';
import { Link } from 'react-router-dom';

import './navlink.styles.scss';

const NavLink = ({ className, menu, onClick }) => {
  return (
    <li className={`navbar-link-container ${className}`} onClick={onClick}>
      <Link className="navbar-link" to={menu.link}>
        {menu.text}
      </Link>
    </li>
  );
};

export default NavLink;
