import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import authentication from '../../services/authentication';
import NavLink from './../navlink/navlink.component';
import './navbar.styles.scss';

class NavBar extends React.Component {
  state = {
    isAuth: false,
    menus: [],
    menuVisibility: false
  };

  async componentDidMount() {
    let auth = false;
    try {
      auth = await authentication.isAuth();
    } catch (error) {}

    this.setState({
      isAuth: auth,
      menus: this.props.menus.filter(menu => {
        if (menu.condition === 'auth') {
          return auth;
        } else if (menu.condition === '!auth') {
          return !auth;
        } else {
          return true;
        }
      })
    });
  }

  handleMenuToggle() {
    const { menuVisibility } = this.state;
    this.setState({ menuVisibility: !menuVisibility });
  }

  render() {
    const { menus, menuVisibility } = this.state;

    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            ProdShop
          </Link>

          <span className="navbar-toggle no-select" onClick={this.handleMenuToggle}>
            <FontAwesomeIcon icon={faBars} />
          </span>

          <ul className={`navbar-items no-select ${menuVisibility ? 'navbar-items-expanded' : ''}`}>
            {menus.map(menu => (
              <NavLink menu={menu} onClick={this.handleMenuToggle} />
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
