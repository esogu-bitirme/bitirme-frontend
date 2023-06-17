import React from 'react';
import { useState } from 'react';
import DoctorReport from './ReportDetails';
import { Patient } from '../types/patient';

export const ReportListItem = () => {
  return (
    <tr>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="whitespace-no-wrap text-gray-900">14524827</p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">Soner Özaşık</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">12/09/2020 10:05:25</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-yellow-900">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-yellow-200 opacity-50"
          ></span>
          <span className="relative">Bekleniyor</span>
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
