import React, { ChangeEvent, useState } from 'react';
import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';

const DoctorReport = () => {
  const [reportid, setreportid] = useState(1);
  const [image, setImage] = useState<File>();
  const [setshowImage, setsetshowImage] = useState(false);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!image) {
      return;
    }
  };
  return (
    <div className="absolute left-0 right-0 z-10 flex h-screen w-screen items-center justify-center bg-zinc-800 bg-opacity-60">
      <section className="w-full">
        <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
          <div className="p-4 border-t-2 border-indigo-400 rounded-t-lg bg-white ">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">Rapor Numarası : {reportid}</div>
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              Rapor Oluşturma Tarihi : {date}
            </div>
          </div>
          <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:space-y-0">
              <div className="w-full flex items-center mb-2 justify-between">
                <h2 className="max-w-sm font-bold text-black flex  ">Görseller</h2>
                <button
                  className="max-w-sm font-medium text-black text-right bg-blue-500 rounded-md text-sm p-2"
                  onClick={handleUploadClick}
                >
                  Görsel Yükle
                </button>
              </div>
              <div className="float-right max-w-fit flex">
                <input type="file" onChange={handleFileChange} className=" mb-4 " />
              </div>
              <div className="max-w">
                <table className="w-full">
                  <thead className="border-b-2 w-full text-center">
                    <tr>
                      <td className="text-black w-1/3">Görsel Adı</td>
                      <td className="text-black w-1/3">Yüklenme Tarihi</td>
                      <td className="text-black w-1/3">Düzenleme</td>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td>görseladı.lgbt</td>
                      <td>{date}</td>
                      <td className="flex">
                        <button
                          type="button"
                          className="py-1 mr-1 px-3 flex justify-center items-center  bg-red-600 hover:bg-red-700 text-white w-1/2 transition text-center font-semibold rounded-lg "
                        >
                          Sil
                        </button>
                        <button
                          type="button"
                          className="py-1 px-3  bg-indigo-600 hover:bg-indigo-700 text-white w-1/2 transition ease-in  text-center font-semibold  rounded-lg "
                        >
                          Görüntüle
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:space-y-0">
              <div className="max-w-sm w-full text-left mb-3">
                <h2 className="justify-start font-medium text-black">Teşhis</h2>
              </div>
              <div className="max-w-sm w-full">
                <input
                  type="text"
                  id="user-info-phone"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-1 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Teşhisinizi Giriniz"
                />
              </div>
            </div>
            <hr />
            <div className="items-center w-full py-2 px-4 space-y-4 text-gray-500 md:space-y-0">
              <div className="max-w-sm w-full text-left mb-3">
                <h2 className="justify-start font-medium text-black">Yorum</h2>
              </div>
              <div className="max-w">
                <textarea
                  id="message"
                  rows={4}
                  className="p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                  placeholder="Yorumunuzu Yazın"
                ></textarea>
              </div>
            </div>
            <hr />
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <button
                type="submit"
                className="py-2 px-4  bg-blue-600 hover:bg-blue-700 text-white w-full transition ease-in duration-200 text-center font-semibold rounded-lg "
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default DoctorReport;
