import React, { useEffect } from 'react';
import { useState } from 'react';
import DoctorReport from './ReportDetails';
import { Patient } from '../types/patient';
import { Report } from '../types/report';

export const ReportListItem = ({ report }: { report: Report }) => {
  useEffect(() => {
    console.log(report);
  }, []);

  return (
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
          <span className="relative">{report.status}</span>
        </span>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Görüntüle
        </a>
      </td>
    </tr>
  );
};
