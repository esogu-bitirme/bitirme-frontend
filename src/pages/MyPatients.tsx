import { useContext, useEffect, useState } from 'react';
import { PatientListItem } from '../components/PatientListItem';
import DoctorReport from './DoctorReport';
import { PatientReportsDoctorView } from '../components/PatientReportsDoctorView';
import { Patient } from '../types/patient';
import AuthContext from '../context/AuthContext';

const patients: any = [];

export const MyPatients = () => {
  const authContext = useContext(AuthContext);
  const [patientReportsView, setPatientReportsView] = useState<Patient>();
  const [showPatientReports, setShowPatientReports] = useState(false);
  const [allPatients, setAllPatients] = useState(patients);

  useEffect(() => {
    fetch('https://localhost:50198/api/patient/doctor', {
      method: 'GET',
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
        console.log(data);
        setAllPatients(data);
      });
  }, []);
  return (
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
                      Telefon Numarası
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      Adres
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
