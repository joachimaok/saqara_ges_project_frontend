import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { IAuthContext } from '../interfaces/auth-context.interface';
import { IUser } from '../interfaces/user.interface';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedData = localStorage.getItem('user_data');
    if (storedData) {
      const { userToken, user } = JSON.parse(storedData);
      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: string, newData: IUser) => {
    localStorage.setItem(
      'user_data',
      JSON.stringify({ userToken: newToken, user: newData }),
    );
    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, userData, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
