import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserToken } from '../types/userToken';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null as UserToken | null,
  token: null as string | null,
  userType: null as string | null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: (username: string, password: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loginFromCookies: () => {},
});
export const AuthProvider = ({ children }: { children: any }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  const login = (username: string, password: string) => {
    fetch('https://localhost:50198/api/user/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const userData: UserToken = parseJwt(data);

        if (userData) {
          localStorage.setItem('token', data);
          setIsAuthenticated(true);
          setUser(userData);
          setToken(data);
          setUserType(userData.role);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    setUserType(null);
    localStorage.removeItem('token');
  };

  const loginFromCookies = () => {
    const token = localStorage.getItem('token');
    let userData: UserToken | null = null;
    if (token) {
      userData = parseJwt(token);
    }
    if (userData && userData.exp && userData.exp > Date.now() / 1000) {
      setIsAuthenticated(true);
      setUser(userData);
      setToken(token);
      setUserType(userData.role);
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        userType,
        login,
        logout,
        loginFromCookies,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
