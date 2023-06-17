import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children, userType }: { children: any; userType: string }) => {
  const authContext = useContext(AuthContext);
  if (!authContext.isAuthenticated || authContext.userType !== userType) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
