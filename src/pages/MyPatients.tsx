import { useState } from 'react';
import { PatientListItem } from '../components/PatientListItem';
import DoctorReport from './DoctorReport';

import { PatientReportsDoctorView } from '../components/PatientReportsDoctorView';
import { Patient } from '../types/patient';

const patients = [
  {
    patientName: 'John Doe',
    patientTCId: '123456789',
    registerDate: '01.01.2021',
    status: 'Aktif',
    patientId: 123,
  },
  {
    patientName: 'Jane Doe',
    patientTCId: '987654321',
    registerDate: '01.01.2021',
    status: 'Aktif',
    patientId: 456,
  },
  {
    patientName: 'John Smith',
    patientTCId: '123123123',
    registerDate: '01.01.2021',
    status: 'Aktif',
    patientId: 789,
  },
  {
    patientName: 'Jane Smith',
    patientTCId: '321321321',
    registerDate: '01.01.2021',
    status: 'Aktif',
    patientId: 101,
  },
];

export const MyPatients = () => {
  const [patientReportsView, setPatientReportsView] = useState<Patient>();
  const [showPatientReports, setShowPatientReports] = useState(false);
  const [allPatients, setAllPatients] = useState(patients);
  return (
    <div className="container max-w-7xl px-4 mx-auto sm:px-8">
      <DoctorReport></DoctorReport>
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl leading-tight">Hastalarım</h2>
          <div className="text-end">
            <div className="mb-2 text-end">
              <form className="flex flex-col justify-end w-3/4 max-w-md space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                <div className=" relative flex">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="TC Kimlik No"
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                  type="submit"
                >
                  Hasta Ekle
                </button>
              </form>
            </div>
    <div>
      {showPatientReports ? (
        <PatientReportsDoctorView
          patient={patientReportsView}
          setShowPatientReports={setShowPatientReports}
        />
      ) : null}
      <div className="container relative z-0 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="py-8">
          <div className="mb-1 flex w-full flex-row justify-between sm:mb-0">
            <h2 className="text-2xl leading-tight">Hastalarım</h2>
            <div className="text-end">
              <div className="mb-2 text-end">
                <form className="flex w-3/4 max-w-md flex-col justify-end space-y-3 md:w-full md:flex-row md:space-x-3 md:space-y-0">
                  <div className=" relative flex">
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="TC Kimlik No"
                    />
                  </div>
                  <button
                    className="flex-shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                    type="submit"
                  >
                    Hasta Ekle
                  </button>
                </form>
              </div>

              <div>
                <form className="flex w-3/4 max-w-md flex-col justify-center space-y-3 md:w-full md:flex-row md:space-x-3 md:space-y-0">
                  <div className=" relative flex">
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      className=" mx-2 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Ad Soyad"
                    />
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="TC Kimlik No"
                    />
                  </div>
                  <button
                    className="flex-shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                    type="submit"
                  >
                    Filtrele
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      Ad Soyad
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      TC Kimlik No
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      Kayıt Tarihi
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      Durum
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {allPatients.map((patient) => (
                    <PatientListItem
                      patient={patient}
                      setPatientReportsView={setPatientReportsView}
                      setShowPatientReports={setShowPatientReports}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
