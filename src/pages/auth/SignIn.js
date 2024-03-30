import React, { useState } from 'react';

const SignIn = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Implement sign-in logic here
    console.log(`Signing in as ${userType}`);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;

