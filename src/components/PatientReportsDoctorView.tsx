import React, { useContext, useEffect, useState } from 'react';
import { Patient } from '../types/patient';

import ReportDetails from './ReportDetails';
import AuthContext from '../context/AuthContext';

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
  const [currentReportDetailsId, setCurrentReportDetailsId] = useState<number | undefined>();
  const [reports, setReports] = useState([]);
  const authContext = useContext(AuthContext);
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
        console.log('asd');

        setReports(data);
        console.log(data);
      });
  }, [showPatientReports]);
  return (
    <>
      {showReportDetails ? (
        <ReportDetails
          reportId={currentReportDetailsId}
          showReportDetails={showReportDetails}
          setShowReportDetails={setShowReportDetails}
          setShowPatientReports={setShowPatientReports}
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
            <div className="m-3">
              <p className="border-b text-xl font-bold">Raporlar</p>
            </div>
            <div className="container mx-auto max-w-3xl px-4 sm:px-8">
              <div className="py-0">
                <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
                  <div className="inline-block min-w-full overflow-hidden rounded-lg border">
                    <table className="min-w-full leading-normal">
                      <thead>
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
                      <tbody>
                        {reports
                          ? reports.map((report) => (
                              <tr>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="whitespace-no-wrap text-gray-900">
                                        {report.id}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                  <p className="whitespace-no-wrap text-gray-900">
                                    {patient?.name}
                                  </p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                  <p className="whitespace-no-wrap text-gray-900">
                                    {report.reportDate}
                                  </p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-yellow-900">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 rounded-full bg-yellow-200 opacity-50"
                                    ></span>
                                    <span className="relative">{report.status}</span>
                                  </span>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-900"
                                    onClick={() => {
                                      setCurrentReportDetailsId(report.id);
                                      setShowPatientReports(false);
                                      setShowReportDetails(true);
                                    }}
                                  >
                                    Görüntüle
                                  </a>
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                    <div className="xs:flex-row xs:justify-between flex flex-col items-center bg-white px-5 py-5">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-full rounded-l-xl border bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                        >
                          <svg
                            width="9"
                            fill="currentColor"
                            height="8"
                            className=""
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="w-full border-b border-t bg-white px-4 py-2 text-base text-indigo-500 hover:bg-gray-100 "
                        >
                          1
                        </button>
                        <button
                          type="button"
                          className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                        >
                          2
                        </button>
                        <button
                          type="button"
                          className="w-full border-b border-t bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                        >
                          3
                        </button>
                        <button
                          type="button"
                          className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                        >
                          4
                        </button>
                        <button
                          type="button"
                          className="w-full rounded-r-xl border-b border-r border-t bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                        >
                          <svg
                            width="9"
                            fill="currentColor"
                            height="8"
                            className=""
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
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
