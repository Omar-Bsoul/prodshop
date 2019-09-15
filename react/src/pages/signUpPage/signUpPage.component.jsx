import React from 'react';

import SignUp from '../../components/signUp/signUp.component';
import Button from '../../components/button/button.component';
import './signUpPage.styles.scss';

const SignUpPage = ({ auth, setAuth, history }) => {
  if (auth) {
    history.push('/');
  } else {
    return (
      <div className="sign-up-container">
        <SignUp setAuth={setAuth}>
          <Button className="btn-big">Sign In</Button>
        </SignUp>
      </div>
    );
  }
};

export default SignUpPage;
