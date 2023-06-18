import React from 'react';
import loginImage from './login-page-image.webp';
import { useState } from 'react';

function Register() {
  const [valuetc, setvaluetc] = useState('');
  const [valuephone, setvaluephone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [mail, setMail] = useState('');
  const [officeNo, setOfficeNo] = useState('');
  const [branch, setBranch] = useState('');
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

  const handleChangephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/, ''); // Remove non-numeric characters

    setvaluephone(numericValue);
  };

  const registerAsPatient = () => {
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
        user: { username: name + surname, password: pass, email: mail },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const registerAsDoctor = () => {
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
        user: { username: name + surname, password: pass, email: mail },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const patient = () => {
    return (
      <div className="flex w-full">
        <div className="mt-2 flex w-1/2 items-center justify-center">
          <div className="flex max-w-md flex-col rounded-lg bg-gray-800 bg-white px-4 py-8 shadow sm:px-6 md:px-8 lg:px-10">
            <div className="mb-2 self-center text-xl font-light text-gray-800 text-white sm:text-2xl">
              Kayıt Ol
            </div>
            <div className="flex items-center justify-center">
              <label className="mx-2 mt-2 select-none text-white">
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
              <label className="mx-2 mt-2 select-none text-white">
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
                <div className="my-4 flex w-full">
                  <button
                    className="w-full rounded-lg  bg-purple-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  focus:ring-offset-purple-200 "
                    onClick={registerAsPatient}
                  >
                    Kayıt Ol
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-2 flex w-1/2 items-center justify-center">
          <img src="./login-page-image.webp" alt="Elinde meme kanseri tutan birinin logosu" />
        </div>
      </div>
    );
  };

  const doctor = () => {
    return (
      <div className="flex w-full">
        <div className="mt-2 flex w-1/2 items-center justify-center">
          <div className="flex max-w-md flex-col rounded-lg bg-gray-800 bg-white px-4 py-8 shadow sm:px-6 md:px-8 lg:px-10">
            <div className="mb-2 self-center text-xl font-light text-gray-800 text-white sm:text-2xl">
              Kayıt Ol
            </div>
            <div className="flex items-center justify-center">
              <label className="mx-2 mt-2 select-none text-white">
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
              <label className="mx-2 mt-2 select-none text-white">
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
                    <div className=" relative mb-2 w-1/2">
                      <label>
                        <select
                          className="w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                <div className="mt-4 flex w-full">
                  <button
                    className="w-full rounded-lg  bg-purple-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  focus:ring-offset-purple-200 "
                    onClick={registerAsDoctor}
                  >
                    Kayıt Ol
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex w-1/2 items-center justify-center">
          <img src="./login-page-image.webp" alt="Elinde meme kanseri tutan birinin logosu" />
        </div>
      </div>
    );
  };

  return <div>{usercheck == 'hasta' ? patient() : doctor()}</div>;
}

export default Register;
