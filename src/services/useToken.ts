import { useState } from 'react';
import { UserLogged } from './Interfaces/UserLoggedInterface';

function useToken() {
  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken;
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken: string) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  }

  function saveUser(user: UserLogged) {
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_is_admin', user.is_admin);
  }

  function removeToken() {
    localStorage.removeItem('token');
    setToken(null);
  }

  function removeUser() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_is_admin');
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
    saveUser,
    removeUser,
  };
}

export default useToken;
