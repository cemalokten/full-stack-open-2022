/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import login from '../../services/login';

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      setUser(res.data);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
