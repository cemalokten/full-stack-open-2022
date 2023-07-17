import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import BlogList from './components/BlogList';
import CreateNew from './components/CreateNew';
import blogs from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser');
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON);
      setUser(data);
      blogs.setToken(data.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <>
      {!user && <Login user={user} setUser={setUser} />}
      {user && (
      <>
        <h1>Blogs</h1>
        <div>
          Logged in as
          {' '}
          {user.username}
          {' '}
          <button type="submit" onClick={handleLogout}>logout</button>
        </div>
        <CreateNew refresh={refresh} setRefresh={setRefresh} />
        <BlogList refresh={refresh} />
      </>
      )}
    </>
  );
};

export default App;
