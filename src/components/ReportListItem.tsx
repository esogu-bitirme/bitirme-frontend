import React, { useEffect } from 'react';
import { useState } from 'react';
import DoctorReport from './ReportDetails';
import { Patient } from '../types/patient';
import { Report } from '../types/report';
import ReportDetailsPatient from './ReportDetailsPatient';

export const ReportListItem = ({ report }: { report: Report }) => {
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [currentReportDetails, setCurrentReportDetails] = useState<Report>();
  

  const getStatusText = (status: Status) => {
    if (status === 0) {
      return 'Bekleniyor';
    } else if (status === 1) {
      return 'Onaylandı';
    } else {
      return 'Bilinmeyen Durum';
    }
  };

  return (
    <>
      {showReportDetails ? (
        <ReportDetailsPatient
          report={currentReportDetails}
          showReportDetails={showReportDetails}
          setShowReportDetails={setShowReportDetails}
        />
      ) : null}
      <tr>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="whitespace-no-wrap text-gray-900">{report.id}</p>
            </div>
          </div>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">
            {report.doctor.name} {report.doctor.surname}
          </p>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">
            {new Date(report.createDate).toLocaleString('en-GB')}
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
              setShowReportDetails(true);
            }}
          >
            Görüntüle
          </a>
        </td>
      </tr>
    </>
  );
};
