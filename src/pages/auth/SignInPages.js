import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const UserSignInPage = () => {
  return (
    <div>
      <h1>User Sign In</h1>
      <SignIn userType="user" />
      <SignUp userType="user" />
    </div>
  );
};

const PublisherSignInPage = () => {
  return (
    <div>
      <h1>Publisher Sign In</h1>
      <SignIn userType="publisher" />
      <SignUp userType="publisher" />
    </div>
  );
};

export { UserSignInPage, PublisherSignInPage };

