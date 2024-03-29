import ErrorPage from './pages/ErrorPage';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import AuthContext, { AuthProvider } from './context/AuthContext';
import { MyPatients } from './pages/MyPatients';
import ProtectedRoute from './context/ProtectedRoute';
import { MyReports } from './pages/MyReports';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
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
        <ProtectedRoute userType="DOCTOR">
          <Header />
          <MyPatients />
          <Footer />
        </ProtectedRoute>
      ),
    },
    {
      path: '/reports',
      element: (
        <ProtectedRoute userType="PATIENT">
          <Header />
          <MyReports />
          <Footer />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div className="z-0 flex h-screen w-screen flex-col justify-between ">
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
