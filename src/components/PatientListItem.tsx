import React, { useContext, useState } from 'react';
import { Patient } from '../types/patient';
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

export const PatientListItem = ({
  patient,
  setPatientReportsView,
  setShowPatientReports,
}: {
  patient: Patient;
  setPatientReportsView: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setShowPatientReports: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const authContext = useContext(AuthContext);

  const handleDeletePatient = () => {
    fetch(`https://localhost:50198/api/doctor/patient/${patient.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + authContext.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        location.reload();
        toast.success('Hasta başarıyla silindi!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((e) => {
        toast.error('Bir hata meydana geldi!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <tr>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="whitespace-no-wrap text-gray-900">
              {patient.name} {patient.surname}
            </p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{patient.tckn}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{patient.phoneNumber}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{patient.address}</p>
      </td>

      <td className="flex border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="w-1/2 p-1">
          <button
            type="button"
            className=" w-full rounded-lg bg-blue-600 px-3 py-1 text-center  font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  focus:ring-offset-blue-200 "
            onClick={() => {
              setShowPatientReports(true);
              setPatientReportsView(patient);
            }}
          >
            Görüntüle
          </button>
        </div>
        <div className="w-1/2 p-1 ">
          <button
            type="button"
            className="w-full rounded-lg  bg-red-600 px-3 py-1 text-center  font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  focus:ring-offset-red-200 "
            onClick={handleDeletePatient}
          >
            Sil
          </button>
        </div>
      </td>
    </tr>
  );
};
