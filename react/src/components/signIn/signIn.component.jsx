import React from 'react';
import { withRouter } from 'react-router-dom';

import http from '../../services/http';
import storage from '../../services/storage';
import FormInput from './../formInput/formInput.component';
import Button from './../button/button.component';
import './signIn.styles.scss';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;
    //this.setState({ email: '', password: '' });

    const { history, setAuth } = this.props;
    try {
      const response = await http.post('login', { email, password });
      console.log(response.data);
      storage.store('user', JSON.stringify(response.data));
      history.push('/');
      setAuth(true);
    } catch (error) {
      setAuth(false);
      console.log(error.message);
    }
  };

  render() {
    const { className, children } = this.props;
    const { email, password } = this.state;

    return (
      <div className={className}>
        <h1>I already have an account</h1>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
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
          <Button className="btn-big" type="submit">
            Sign In
          </Button>
        </form>
        <br />
        {children}
      </div>
    );
  }
}

export default withRouter(SignIn);
