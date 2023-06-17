import React from 'react';
import { Patient } from '../types/patient';

export const PatientListItem = ({
  patient,
  setPatientReportsView,
  setShowPatientReports,
}: {
  patient: Patient;
  setPatientReportsView: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setShowPatientReports: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <tr>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="whitespace-no-wrap text-gray-900">{patient.patientName}</p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{patient.patientTCId}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{patient.registerDate}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-green-200 opacity-50"
          ></span>
          <span className="relative">{patient.status}</span>
        </span>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <button
          type="button"
          className="w-full rounded-lg  bg-indigo-600 px-3 py-1 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
          onClick={() => {
            setShowPatientReports(true);
            setPatientReportsView(patient);
          }}
        >
          Görüntüle
        </button>
      </td>
    </tr>
  );
};
