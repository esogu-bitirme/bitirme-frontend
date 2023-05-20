import React from 'react';

export const ReportListItem = () => {
  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">14524827</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">Soner Özaşık</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">12/09/2020 10:05:25</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">12/09/2020 12:25:56</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-yellow-900">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-yellow-200 rounded-full opacity-50"
          ></span>
          <span className="relative">Bekleniyor</span>
        </span>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Görüntüle
        </a>
      </td>
    </tr>
  );
};
