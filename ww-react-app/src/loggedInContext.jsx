import React,{ createContext, useContext, useState } from 'react';

/**
 * A Global context wrapper to store the state of whether a user is logged in or not.
 */

const AuthContext = createContext();

export const LoggedInContextProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLoggedInContext = () => useContext(AuthContext);
