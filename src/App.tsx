import ErrorPage from './pages/ErrorPage';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import AuthContext, { AuthProvider } from './context/AuthContext';
import { MyPatients } from './pages/MyPatients';
import ProtectedRoute from './context/ProtectedRoute';
import { MyReports } from './pages/MyReports';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/patients',
      element: (
        <ProtectedRoute userType="doctor">
          <MyPatients />,
        </ProtectedRoute>
      ),
    },
    {
      path: '/reports',
      element: (
        <ProtectedRoute userType="patient">
          <MyReports />,
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div className="flex w-screen justify-center">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
