import React, { useState } from 'react';

const SignUp = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Implement sign-up logic here
    console.log(`Signing up as ${userType}`);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;

