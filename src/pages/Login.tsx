import { useContext, useEffect, useState } from 'react';
import loginImage from './login-page-image.webp';
import AuthContext from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

export const Login = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    authContext.loginFromCookies();
  }, []);

  useEffect(() => {
    if (authContext.userType === 'DOCTOR') {
      navigate('/patients');
    } else if (authContext.userType === 'PATIENT') {
      navigate('/reports');
    } else {
      console.error('Unknown user type');
    }
  }, [authContext.userType]);

  return (
    <div className="flex w-full">
      <div className="flex w-1/2 items-center justify-center">
        <div className="flex w-full max-w-md flex-col rounded-lg bg-white px-4 py-8 shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="mb-2 self-center text-xl font-bold text-gray-600 dark:text-white sm:text-2xl">
            Giriş Yap
          </div>
          <div className="mt-8">
            <form
              action="#"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="mb-2 flex flex-col">
                <div className="relative flex ">
                  <span className="inline-flex items-center  rounded-l-md border-b border-l border-t border-gray-300 bg-white  px-3 text-sm text-gray-500 shadow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="sign-in-email"
                    className=" w-full flex-1 appearance-none rounded-r-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="T.C. Kimlik No"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6 flex flex-col">
                <div className="relative flex ">
                  <span className="inline-flex items-center  rounded-l-md border-b border-l border-t border-gray-300 bg-white  px-3 text-sm text-gray-500 shadow-sm">
                    <svg
                      width="15"
                      height="15"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>
                  <input
                    type="password"
                    id="sign-in-password"
                    className=" w-full flex-1 appearance-none rounded-r-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Şifre"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="w-full rounded-lg  bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  focus:ring-offset-blue-200 "
                  onClick={() => {
                    authContext.login(username, password);
                  }}
                >
                  Giriş Yap
                </button>
              </div>
            </form>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={() => {
                navigate('/register');
              }}
              className="ml-2"
            >
              Hesabın yok mu?
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <img src="./login-page-image.webp" alt="Elinde meme kanseri tutan birinin logosu" />
      </div>
    </div>
  );
};
