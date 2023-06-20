import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export const Header = () => {
  const authContext = useContext(AuthContext);
  return (
    <div>
      <nav className="flex flex-wrap items-center justify-between bg-white p-4">
        <div className="block lg:hidden">
          <button className="navbar-burger flex items-center rounded border border-indigo-500 px-3 py-2 text-indigo-500">
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <div className="navbar-menu hidden w-full lg:order-1 lg:block lg:w-2/5">
          <a
            className="mr-10 mt-4 block text-blue-900 hover:text-indigo-600 lg:mt-0 lg:inline-block"
            href="#"
          >
            Anasayfa
          </a>
          {authContext.userType == 'DOCTOR' && (
            <a
              className="mr-10 mt-4 block text-blue-900 hover:text-indigo-600 lg:mt-0 lg:inline-block"
              href="/patients"
            >
              Hastalarım
            </a>
          )}
          {authContext.userType == 'PATIENT' && (
            <a
              className="mr-10 mt-4 block text-blue-900 hover:text-indigo-600 lg:mt-0 lg:inline-block"
              href="/reports"
            >
              Raporlarım
            </a>
          )}
        </div>
        <div className="navbar-menu hidden w-full lg:order-3 lg:block lg:w-2/5 lg:text-right">
          <a
            className="mt-4 block text-blue-900 hover:text-indigo-600 lg:mt-0 lg:inline-block"
            href="/login"
            onClick={() => {
              authContext.logout();
            }}
          >
            Çıkış Yap
          </a>
        </div>
      </nav>
      <hr />
    </div>
  );
};
