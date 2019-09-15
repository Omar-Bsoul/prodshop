import React from 'react';

import SignIn from '../../components/signIn/signIn.component';
import Button from '../../components/button/button.component';
import './signInPage.styles.scss';

const SignInPage = ({ auth, setAuth, history }) => {
  if (auth) {
    history.push('/');
  } else {
    return (
      <div className="sign-in-container">
        <SignIn setAuth={setAuth}>
          <Button className="btn-big">Sign Up</Button>
        </SignIn>
      </div>
    );
  }
};

export default SignInPage;
