import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: any }) => {
  const authContext = useContext(AuthContext);
  if (!authContext.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
