import React, { useContext, useEffect, useRef, useState } from 'react';
import { Patient } from '../types/patient';

import ReportDetails from './ReportDetails';
import AuthContext from '../context/AuthContext';
import { Report } from '../types/report';

// const reports = [
//   {
//     id: 1111111111,
//     patientId: 1,
//     doctorId: 1,
//     reportDate: '11/1/2021 10:05:25',
//     reportStatus: 'Bekleniyor',
//   },
//   {
//     id: 2222222222,
//     patientId: 1,
//     doctorId: 1,
//     reportDate: '22/22/2020 10:05:25',
//     reportStatus: 'Bekleniyor',
//   },
// ];

const reports: Array<Report> = [];

export const PatientReportsDoctorView = ({
  patient,
  setShowPatientReports,
  showPatientReports,
}: {
  patient: Patient | undefined;
  setShowPatientReports: React.Dispatch<React.SetStateAction<boolean>>;
  showPatientReports: boolean;
}) => {
  const [closeStrokeWidth, setCloseStrokeWidth] = useState(1.5);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [currentReportDetails, setCurrentReportDetails] = useState<Report>();
  const [allReports, setAllReports] = useState(reports);
  const authContext = useContext(AuthContext);
  const reportsEndRef = useRef(null);
  const scrollToBottom = () => {
    reportsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    if (!showPatientReports) return;
    fetch(`https://localhost:50198/api/report/patient/${patient?.id}`, {
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
        setAllReports(data);
      });
  }, [showPatientReports]);

  const getStatusText = (status: Status) => {
    if (status === 0) {
      return 'Bekleniyor';
    } else if (status === 1) {
      return 'Onaylandı';
    } else {
      return 'Bilinmeyen Durum';
    }
  };

  const handleNewReport = (patientId: number) => {
    const newReportBody = {
      status: 0,
      diagnosis: '',
      description: '',
      patientId: 10,
    };
    fetch(`https://localhost:50198/api/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + authContext.token,
      },
      body: JSON.stringify(newReportBody),
    }).then(() => {
      fetch(`https://localhost:50198/api/report/patient/${patient?.id}`, {
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
          setAllReports(data);
          scrollToBottom();
        });
    });
  };

  return (
    <>
      {showReportDetails ? (
        <ReportDetails
          report={currentReportDetails}
          showReportDetails={showReportDetails}
          setShowReportDetails={setShowReportDetails}
          setShowPatientReports={setShowPatientReports}
          patient={patient}
        />
      ) : null}

      {showPatientReports ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-screen items-center justify-center rounded bg-zinc-800 bg-opacity-60">
          <div className="rounded bg-white">
            <div className="flex w-full justify-between">
              <div className="m-3 text-xl">
                <div>
                  <p>
                    <b>Hasta Adı:</b> {patient?.name} {patient?.surname}
                  </p>
                </div>
                <div>
                  <p>
                    <b>TC Kimlik:</b> {patient?.tckn}
                  </p>
                </div>
              </div>
              <button
                className="m-0 mr-2 mt-2 h-fit p-0 font-bold"
                onClick={() => {
                  setShowPatientReports(false);
                }}
                onMouseOver={(e) => {
                  setCloseStrokeWidth(2.5);
                }}
                onMouseOut={(e) => {
                  setCloseStrokeWidth(1.5);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={closeStrokeWidth}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex w-full justify-between">
              <div className="m-3">
                <p className="border-b text-xl font-bold">Raporlar</p>
              </div>
              <div className="mr-10">
                <button
                  onClick={() => handleNewReport(patient?.id as number)}
                  className=" flex w-full gap-2 rounded-lg  bg-indigo-600 px-3 py-1 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
                >
                  Rapor Ekle
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="container mx-auto max-w-3xl px-4 sm:px-8">
              <div className="py-0">
                <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
                  <div className="inline-block min-w-full overflow-hidden rounded-lg border">
                    <table className="min-w-full leading-normal">
                      <thead className="table w-full table-fixed">
                        <tr>
                          <th
                            scope="col"
                            className="border-b  border-gray-300 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                          >
                            Rapor Numarası
                          </th>
                          <th
                            scope="col"
                            className="border-b  border-gray-300 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                          >
                            Hasta Adı
                          </th>

                          <th
                            scope="col"
                            className="border-b border-gray-300 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                          >
                            Son Düzenlenme Tarihi
                          </th>
                          <th
                            scope="col"
                            className="border-b border-gray-300 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                          >
                            Durum
                          </th>
                          <th
                            scope="col"
                            className="border-b border-gray-300 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="block max-h-80 overflow-y-scroll">
                        {allReports.map((report: Report) => (
                          <tr className="table w-full table-fixed">
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <div className="flex items-center">
                                <div className="ml-3">
                                  <p className="whitespace-no-wrap text-gray-900">{report.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-900">
                                {patient?.name} {patient?.surname}
                              </p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-900">
                                {new Date(report.updateDate).toLocaleString('en-GB')}
                              </p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-yellow-900">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0 rounded-full bg-yellow-200 opacity-50"
                                ></span>
                                <span className="relative">{getStatusText(report.status)}</span>
                              </span>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={() => {
                                  setCurrentReportDetails(report);
                                  setShowPatientReports(false);
                                  setShowReportDetails(true);
                                }}
                              >
                                Görüntüle
                              </a>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <div ref={reportsEndRef} />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
