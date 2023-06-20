import React from 'react';
import loginImage from './login-page-image.webp';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const [valuetc, setvaluetc] = useState('');
  const [valuephone, setvaluephone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [mail, setMail] = useState('');
  const [gender, setGender] = useState('Erkek');
  const [officeNo, setOfficeNo] = useState('');
  const [branch, setBranch] = useState('');
  const [usercheck, setusercheck] = useState('hasta');
  const [date, setdate] = useState('');
  const [pass, setpass] = useState('');
  const [conf_pass, setconf_pass] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlepass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpass(e.target.value);
  };

  const handleconfirm_pass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setconf_pass(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (pass !== conf_pass) {
      toast.warning('Şifreler eşleşmiyor!', {
        position: toast.POSITION.TOP_RIGHT,
      });
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

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);
  };

  const handleSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSurname(inputValue);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAddress(inputValue);
  };

  const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMail(inputValue);
  };

  const handleBranch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setBranch(inputValue);
  };

  const handleOfficeNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setOfficeNo(inputValue);
  };

  const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = e.target.value;
    setGender(inputValue);
  };

  const handleChangephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/, ''); // Remove non-numeric characters

    setvaluephone(numericValue);
  };

  const registerAsPatient = () => {
    setIsLoading(true);
    fetch('https://localhost:50198/api/patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        tckn: valuetc,
        phoneNumber: valuephone,
        address: address,
        gender: gender,
        birthDate: date,
        user: { username: name + surname, password: pass, email: mail },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        toast.success('Kayıt olma başarılı !', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error('Bir hata oluştu !', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      });
  };

  const registerAsDoctor = () => {
    setIsLoading(true);
    fetch('https://localhost:50198/api/doctor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        tckn: valuetc,
        phoneNumber: valuephone,
        address: address,
        officeNo: officeNo,
        branch: branch,
        gender: gender,
        birthDate: date,
        user: { username: name + surname, password: pass, email: mail },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        toast.success('Kayıt olma başarılı !', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error('Bir hata oluştu !', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      });
  };

  const patient = () => {
    return (
      <>
        {isLoading && (
          <div
            role="status"
            className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              aria-hidden="true"
              className="mr-2 h-10 w-10 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}

        <div className={`flex h-screen w-full ${isLoading ? 'blur-sm' : ''}`}>
          <div className="mt-2 flex w-1/2 items-center justify-center">
            <div className="flex max-w-md flex-col rounded-lg bg-gray-800 bg-white px-4 py-8 shadow sm:px-6 md:px-8 lg:px-10">
              <div className="mb-2 self-center text-xl font-light text-gray-800 text-white sm:text-2xl">
                Kayıt Ol
              </div>
              <div className="flex items-center justify-center">
                <label className="mx-2 mt-2 select-none text-black">
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
                <label className="mx-2 mt-2 select-none text-black">
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
              <div className="mt-2 p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2 flex">
                    <div className=" relative w-1/2">
                      <input
                        type="text"
                        id="create-patient-name"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="pseudo"
                        placeholder="Ad"
                        onChange={handleName}
                        value={name}
                      />
                    </div>
                    <div className=" relative ml-2 w-1/2 ">
                      <input
                        type="text"
                        id="create-patient-lastname"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="First name"
                        placeholder="Soyad"
                        onChange={handleSurname}
                        value={surname}
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex">
                    <div className=" relative w-1/2">
                      <input
                        type="text"
                        value={valuetc}
                        onChange={handleChangeTc}
                        maxLength={11}
                        id="create-patient-idnum"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="TC kimlik"
                        placeholder="TC Kimlik"
                      />
                    </div>
                    <div className=" relative ml-2 w-1/2">
                      <input
                        type="text"
                        value={valuephone}
                        onChange={handleChangephone}
                        maxLength={11}
                        id="create-patient-phonenum"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Telefon Numarası"
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex">
                    <div className=" relative w-1/2">
                      <input
                        type="text"
                        id="create-patient-email"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="Mail adresi"
                        placeholder="Mail Adresi"
                        value={mail}
                        onChange={handleMail}
                      />
                    </div>
                    <div className=" relative ml-2 w-1/2">
                      <input
                        type="date"
                        id="create-patient-bday"
                        value={date}
                        onChange={datecheck}
                        className="w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Doğum Tarihi"
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex">
                    <div className=" relative mb-2 w-1/2">
                      <label>
                        <select
                          className="w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                          name="Cinsiyet"
                          id="create-patient-gender"
                          value={gender}
                          onChange={handleGender}
                        >
                          <option value="" className="disabled selected hidden text-gray-400">
                            Cinsiyet
                          </option>
                          <option>Erkek</option>
                          <option>Kadın</option>
                        </select>
                      </label>
                    </div>
                    <div className=" relative mb-2 w-1/2">
                      <input
                        type="text"
                        id="create-patient-phonenum"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Adres"
                        onChange={handleAddress}
                        value={address}
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex">
                    <div className=" relative w-1/2">
                      <input
                        type="password"
                        id="create-patient-password"
                        value={pass}
                        onChange={handlepass}
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="Last name"
                        placeholder="Şifre"
                      />
                    </div>
                    <div className=" relative ml-2 w-1/2">
                      <input
                        type="password"
                        id="create-patient-password-confirm"
                        value={conf_pass}
                        onChange={handleconfirm_pass}
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Şifre Tekrar"
                      />
                    </div>
                  </div>
                  <div className="my-4 w-full">
                    <div className="p-2">
                      <button
                        className="w-full rounded-lg  bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  focus:ring-offset-blue-200 "
                        onClick={registerAsPatient}
                      >
                        Kayıt Ol
                      </button>
                    </div>
                    <div className="p-2">
                      <button
                        className="w-full rounded-lg  bg-blue-400 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2  focus:ring-offset-blue-100"
                        onClick={(e) => {
                          e.preventDefault();
                          location.href = '/login';
                        }}
                      >
                        Giriş Ekranına Dön
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-2 flex w-1/2 items-center justify-center">
            <img
              className="h-full w-full object-cover"
              src="./login-page-image.webp"
              alt="Elinde meme kanseri tutan birinin logosu"
            />
          </div>
        </div>
      </>
    );
  };

  const doctor = () => {
    return (
      <>
        {isLoading && (
          <div
            role="status"
            className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              aria-hidden="true"
              className="mr-2 h-10 w-10 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <div className={`flex h-screen w-full ${isLoading ? 'blur-sm' : ''}`}>
          <form onSubmit={handleSubmit} className="mt-2 flex w-1/2 items-center justify-center">
            <div className="flex max-w-md flex-col rounded-lg bg-gray-800 bg-white px-4 py-8 shadow sm:px-6 md:px-8 lg:px-10">
              <div className="mb-2 self-center text-xl font-light text-gray-800 text-white sm:text-2xl">
                Kayıt Ol
              </div>
              <div className="flex items-center justify-center">
                <label className="mx-2 mt-2 select-none text-black">
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
                <label className="mx-2 mt-2 select-none text-black">
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
              <div className="mt-2 p-6">
                <div>
                  <div className="mb-2 flex">
                    <div className=" relative w-1/2">
                      <input
                        type="text"
                        id="create-doctor-name"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="pseudo"
                        placeholder="Ad"
                        value={name}
                        onChange={handleName}
                      />
                    </div>
                    <div className=" relative ml-2 w-1/2 ">
                      <input
                        type="text"
                        id="create-doctor-lastname"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="First name"
                        placeholder="Soyad"
                        value={surname}
                        onChange={handleSurname}
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex">
                    <div className=" relative w-1/2">
                      <input
                        type="text"
                        value={valuetc}
                        onChange={handleChangeTc}
                        maxLength={11}
                        id="create-doctor-idnum"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="TC kimlik"
                        placeholder="TC Kimlik"
                      />
                    </div>
                    <div className=" relative ml-2 w-1/2">
                      <input
                        type="text"
                        value={valuephone}
                        onChange={handleChangephone}
                        maxLength={11}
                        id="create-doctor-phonenum"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Telefon Numarası"
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex">
                    <div className=" relative w-1/2">
                      <input
                        type="text"
                        id="create-doctor-email"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="Mail adresi"
                        placeholder="Mail Adresi"
                        value={mail}
                        onChange={handleMail}
                      />
                    </div>
                    <div className=" relative ml-2 w-1/2">
                      <input
                        type="date"
                        id="create-doctor-bday"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Doğum Tarihi"
                        value={date}
                        onChange={datecheck}
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex">
                    <div className=" relative w-1/2">
                      <input
                        type="text"
                        id="create-doctor-office"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="Ofis"
                        placeholder="Ofis"
                        value={officeNo}
                        onChange={handleOfficeNo}
                      />
                    </div>
                    <div className=" relative ml-2 w-1/2">
                      <input
                        type="text"
                        id="create-doctor-profession"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Uzmanlık Alanı"
                        value={branch}
                        onChange={handleBranch}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex">
                      <div className=" relative w-1/2">
                        <label>
                          <select
                            className="w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                            name="Cinsiyet"
                            id="create-patient-gender"
                            value={gender}
                            onChange={handleGender}
                          >
                            <option value="" className="disabled selected hidden text-gray-400">
                              Cinsiyet
                            </option>
                            <option>Erkek</option>
                            <option>Kadın</option>
                          </select>
                        </label>
                      </div>
                      <div className=" relative mb-2 w-1/2">
                        <input
                          type="text"
                          id="create-patient-phonenum"
                          className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder="Adres"
                          onChange={handleAddress}
                          value={address}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 flex">
                    <div className=" relative w-1/2">
                      <input
                        type="password"
                        id="create-doctor-password"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        name="Last name"
                        placeholder="Şifre"
                        value={pass}
                        onChange={handlepass}
                      />
                    </div>
                    <div className=" relative ml-2 w-1/2">
                      <input
                        type="password"
                        id="create-doctor-password-confirm"
                        className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Şifre Tekrar"
                        value={conf_pass}
                        onChange={handleconfirm_pass}
                      />
                    </div>
                  </div>
                  <div className="mt-4 w-full">
                    <div className="p-2">
                      <button
                        className="w-full rounded-lg  bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  focus:ring-offset-blue-200"
                        onClick={registerAsDoctor}
                      >
                        Kayıt Ol
                      </button>
                    </div>
                    <div className="p-2">
                      <button
                        className="w-full rounded-lg  bg-blue-400 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2  focus:ring-offset-blue-100"
                        onClick={(e) => {
                          e.preventDefault();
                          location.href = '/login';
                        }}
                      >
                        Giriş Ekranına Dön
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="mt-2 flex w-1/2 items-center justify-center">
            <img
              className="h-full w-full object-cover"
              src="./login-page-image.webp"
              alt="Elinde meme kanseri tutan birinin logosu"
            />
          </div>
        </div>
      </>
    );
  };

  return <div>{usercheck == 'hasta' ? patient() : doctor()}</div>;
}

export default Register;
