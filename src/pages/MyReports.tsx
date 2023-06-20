import React, { useContext, useEffect, useState } from 'react';
import { ReportListItem } from '../components/ReportListItem';
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const reports: any = [];

export const MyReports = () => {
  const authContext = useContext(AuthContext);
  const [allReports, setAllReports] = useState(reports);

  useEffect(() => {
    fetch('https://localhost:50198/api/report/myreports', {
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
      })
      .catch((e) => {
        toast.error('Bir hata meydana geldi!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-8">
      <div className="py-8">
        <div className="mb-1 flex w-full flex-row justify-between sm:mb-0">
          <h2 className="text-2xl leading-tight">Raporlarım</h2>
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
                    Rapor Numarası
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    Doktor
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    Oluşturulma Tarihi
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    Son İşlem Tarihi
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
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {allReports.map((report: any, index: number) => (
                  <ReportListItem key={index} report={report} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
