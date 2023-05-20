import React from 'react';
import loginImage from './login-page-image.webp';
import { useState } from 'react';

function Register() {
  const [valuetc, setvaluetc] = useState('');
  const [valuephone, setvaluephone] = useState('');
  const [usercheck, setusercheck] = useState('hasta');
  const [date, setdate] = useState('');
  const [pass, setpass] = useState('');
  const [conf_pass, setconf_pass] = useState('');

  const handlepass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpass(e.target.value);
  };

  const handleconfirm_pass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setconf_pass(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (pass !== conf_pass) {
      alert('Şifreler eşleşmiyor.');
      return;
    }
  };
  const datecheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = new Date(e.target.value);
    const currentDate = new Date();
    if (inputValue < currentDate) {
      setdate(e.target.value);
    } else {
      alert('Geçerli bir tarih giriniz');
      setdate('');
    }
  };

  const handleChangeTc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/, ''); // Remove non-numeric characters

    setvaluetc(numericValue);
  };

  const handleChangephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/, ''); // Remove non-numeric characters

    setvaluephone(numericValue);
  };

  const patient = () => {
    return (
      <div className="flex w-full">
        <div className="flex items-center justify-center w-1/2 mt-2">
          <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
              Kayıt Ol
            </div>
            <div className="flex items-center justify-center">
              <label className="mx-2 mt-2 text-white select-none">
                <input
                  type="checkbox"
                  className="accent-yellow-500"
                  onClick={() => {
                    setusercheck('hasta');
                  }}
                  checked={usercheck === 'hasta'}
                />{' '}
                Hasta
              </label>
              <label className="mx-2 mt-2 text-white select-none">
                <input
                  type="checkbox"
                  className="accent-pink-500"
                  onClick={() => {
                    setusercheck('doktor');
                  }}
                  checked={usercheck === 'doktor'}
                />{' '}
                Doktor
              </label>
            </div>
            <div className="p-6 mt-2">
              <form onSubmit={handleSubmit}>
                <div className="flex mb-2">
                  <div className=" relative w-1/2">
                    <input
                      type="text"
                      id="create-patient-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="pseudo"
                      placeholder="Ad"
                    />
                  </div>
                  <div className=" relative w-1/2 ml-2 ">
                    <input
                      type="text"
                      id="create-patient-lastname"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="First name"
                      placeholder="Soyad"
                    />
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className=" relative w-1/2">
                    <input
                      type="text"
                      value={valuetc}
                      maxLength={11}
                      id="create-patient-idnum"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="TC kimlik"
                      placeholder="TC Kimlik"
                    />
                  </div>
                  <div className=" relative w-1/2 ml-2">
                    <input
                      type="text"
                      value={valuephone}
                      onChange={handleChangephone}
                      maxLength={11}
                      id="create-patient-phonenum"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Telefon Numarası"
                    />
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className=" relative w-1/2">
                    <input
                      type="text"
                      id="create-patient-email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="Mail adresi"
                      placeholder="Mail Adresi"
                    />
                  </div>
                  <div className=" relative w-1/2 ml-2">
                    <input
                      type="date"
                      id="create-patient-bday"
                      value={date}
                      onChange={datecheck}
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Doğum Tarihi"
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative mb-2">
                    <label>
                      <select
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        name="Cinsiyet"
                        id="create-patient-gender"
                      >
                        <option value="" className="disabled selected hidden text-gray-400">
                          Cinsiyet
                        </option>
                        <option>Erkek</option>
                        <option>Kadın</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className=" relative w-1/2">
                    <input
                      type="password"
                      id="create-patient-password"
                      value={pass}
                      onChange={handlepass}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="Last name"
                      placeholder="Şifre"
                    />
                  </div>
                  <div className=" relative w-1/2 ml-2">
                    <input
                      type="password"
                      id="create-patient-password-confirm"
                      value={conf_pass}
                      onChange={handleconfirm_pass}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Şifre Tekrar"
                    />
                  </div>
                </div>
                <div className="flex w-full my-4">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Kayıt Ol
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-1/2 mt-2">
          <img src="./login-page-image.webp" alt="Elinde meme kanseri tutan birinin logosu" />
        </div>
      </div>
    );
  };

  const doctor = () => {
    return (
      <div className="flex w-full">
        <div className="flex items-center justify-center w-1/2 mt-2">
          <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
              Kayıt Ol
            </div>
            <div className="flex items-center justify-center">
              <label className="mx-2 mt-2 text-white select-none">
                <input
                  type="checkbox"
                  className="accent-yellow-500"
                  onClick={() => {
                    setusercheck('hasta');
                  }}
                  checked={usercheck === 'hasta'}
                />{' '}
                Hasta
              </label>
              <label className="mx-2 mt-2 text-white select-none">
                <input
                  type="checkbox"
                  className="accent-pink-500"
                  onClick={() => {
                    setusercheck('doktor');
                  }}
                  checked={usercheck === 'doktor'}
                />{' '}
                Doktor
              </label>
            </div>
            <div className="p-6 mt-2">
              <form action="#">
                <div className="flex mb-2">
                  <div className=" relative w-1/2">
                    <input
                      type="text"
                      id="create-doctor-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="pseudo"
                      placeholder="Ad"
                    />
                  </div>
                  <div className=" relative w-1/2 ml-2 ">
                    <input
                      type="text"
                      id="create-doctor-lastname"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="First name"
                      placeholder="Soyad"
                    />
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className=" relative w-1/2">
                    <input
                      type="text"
                      value={valuetc}
                      onChange={handleChangeTc}
                      maxLength={11}
                      id="create-doctor-idnum"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="TC kimlik"
                      placeholder="TC Kimlik"
                    />
                  </div>
                  <div className=" relative w-1/2 ml-2">
                    <input
                      type="text"
                      value={valuephone}
                      onChange={handleChangephone}
                      maxLength={11}
                      id="create-doctor-phonenum"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Telefon Numarası"
                    />
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className=" relative w-1/2">
                    <input
                      type="text"
                      id="create-doctor-email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="Mail adresi"
                      placeholder="Mail Adresi"
                    />
                  </div>
                  <div className=" relative w-1/2 ml-2">
                    <input
                      type="date"
                      id="create-doctor-bday"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Doğum Tarihi"
                    />
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className=" relative w-1/2">
                    <input
                      type="text"
                      id="create-doctor-office"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="Ofis"
                      placeholder="Ofis"
                    />
                  </div>
                  <div className=" relative w-1/2 ml-2">
                    <input
                      type="text"
                      id="create-doctor-profession"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Uzmanlık Alanı"
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative mb-2">
                    <label>
                      <select
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        name="Cinsiyet"
                        id="create-doctor-gender"
                      >
                        <option value="" className="disabled selected hidden text-gray-400">
                          Cinsiyet
                        </option>
                        <option>Erkek</option>
                        <option>Kadın</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className=" relative w-1/2">
                    <input
                      type="password"
                      id="create-doctor-password"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="Last name"
                      placeholder="Şifre"
                    />
                  </div>
                  <div className=" relative w-1/2 ml-2">
                    <input
                      type="password"
                      id="create-doctor-password-confirm"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Şifre Tekrar"
                    />
                  </div>
                </div>
                <div className="flex w-full mt-4">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Kayıt Ol
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-1/2 mt-2">
          <img src="./login-page-image.webp" alt="Elinde meme kanseri tutan birinin logosu" />
        </div>
      </div>
    );
  };

  return <div>{usercheck == 'hasta' ? patient() : doctor()}</div>;
}

export default Register;
