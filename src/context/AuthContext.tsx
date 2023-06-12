import { createContext, useState } from 'react';

type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  type: string;
};

const AuthContext = createContext({
  isAuthenticated: false,
  user: null as User | null,
  token: null as string | null,
  userType: null as string | null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});
export const AuthProvider = ({ children }: { children: any }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const login = () => {
    setIsAuthenticated(true);
    setUser({
      email: 'mail@mail.com',
      id: '0000',
      name: 'Name',
      surname: 'Surname',
      type: 'Doctor',
    } as User);
    setToken('PLACEHOLDER TOKEN');
    setUserType('Doctor');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
