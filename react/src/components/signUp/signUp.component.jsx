import React from 'react';
import { withRouter } from 'react-router-dom';

import http from '../../services/http';
import storage from '../../services/storage';
import FormInput from '../formInput/formInput.component';
import Button from './../button/button.component';
import './signUp.styles.scss';

class SignUp extends React.Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { fullName, email, password, confirmPassword } = this.state;
    if (fullName.trim().length > 3) {
      if (password === confirmPassword) {
        //this.setState({ fullName: '', email: '', password: '', confirmPassword: '' });

        const { history, setAuth } = this.props;
        try {
          const response = await http.post('users', { fullName, email, password });
          storage.store('user', JSON.stringify(response.data));
          history.push('/');
          setAuth(true);
        } catch (error) {
          setAuth(false);
        }
      }
    }
  };

  render() {
    const { children, className } = this.props;
    const { fullName, email, password, confirmPassword } = this.state;

    return (
      <div className={`sign-up ${className}`}>
        <h1>I do not have an account</h1>
        <span>Sign up with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="fullName"
            type="name"
            label="Full Name"
            value={fullName}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            name="email"
            type="email"
            label="Email"
            value={email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={this.handleChange}
            required
          />
          <Button className="btn-big" type="submit">
            Sign Up
          </Button>
        </form>
        <br />
        {children}
      </div>
    );
  }
}

export default withRouter(SignUp);
