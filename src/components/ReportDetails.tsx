import React, { ChangeEvent, useState, useEffect, useContext } from 'react';
import ImageDetails from './ImageDetails';
import { Report } from '../types/report';
import AuthContext from '../context/AuthContext';

const ReportDetails = ({
  report,
  showReportDetails,
  setShowReportDetails,
  setShowPatientReports,
}: {
  report: Report | any;
  showReportDetails: boolean;
  setShowReportDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPatientReports: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [thisShow, setThisShow] = useState(true);
  const [imageFile, setImageFile] = useState<File>();
  const [showImage, setShowImage] = useState(false);
  const [closeStrokeWidth, setCloseStrokeWidth] = useState(1.5);
  const [description, setDescription] = useState(report.description);
  const [diagnosis, setDiagnosis] = useState(report.diagnosis);
  const authContext = useContext(AuthContext);
  let imageurl;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
  };

  const handleDiagnosis = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDiagnosis(inputValue);
  };

  const handleUploadClick = () => {
    if (!imageFile) {
      return;
    }
    console.log(imageFile);
    imageurl = URL.createObjectURL(imageFile);
    console.log(imageurl);
    //   fetch('/endpoint', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       reportId: reportId,
    //       picName: imageFile?.name,
    //       picture: imageFile,
    //     }),
    //headers: {
    //  'Content-type': 'application/json; charset=UTF-8',
    // },
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data);
    // Handle data
    //  })
    //  .catch((err) => {
    //     console.log(err.message);
    // });
    //};
  };

  const handleSaveClick = () => {
    fetch('https://localhost:50198/api/report', {
      method: 'PUT',
      body: JSON.stringify({
        id: report.id,
        status: report.status,
        diagnosis: diagnosis,
        description: description,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + authContext.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      {showImage ? (
        <ImageDetails
          setShowImage={setShowImage}
          showImage={showImage}
          setShowReportDetails={setThisShow}
        />
      ) : null}
      {showReportDetails && thisShow ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-zinc-800 bg-opacity-60">
          <section className="w-full">
            <div className="container mx-auto max-w-2xl shadow-md md:w-3/4">
              <div className="flex justify-between rounded-t-lg border-t-2 border-indigo-400 bg-white p-4 ">
                <div>
                  <div className="mx-auto max-w-sm md:mx-0 md:w-full">
                    Rapor Numarası : {report.id}
                  </div>
                  <div className="mx-auto max-w-sm md:mx-0 md:w-full">
                    Rapor Oluşturma Tarihi : {new Date(report.createDate).toLocaleString('en-GB')}
                  </div>
                </div>
                <button
                  className="m-0 mr-2 mt-2 h-fit p-0 font-bold"
                  onClick={() => {
                    setShowPatientReports(true);
                    setShowReportDetails(false);
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
              <div className="space-y-6 bg-white">
                <div className="w-full items-center space-y-4 p-4 text-gray-500 md:space-y-0">
                  <div className="mb-2 flex w-full items-center justify-between">
                    <h2 className="flex max-w-sm font-bold text-black  ">Görseller</h2>
                    <button
                      className="max-w-sm rounded-md bg-blue-500 p-2 text-right text-sm font-medium text-black"
                      onClick={handleUploadClick}
                    >
                      Görsel Yükle
                    </button>
                  </div>
                  <div className="float-right flex max-w-fit">
                    <input type="file" onChange={handleFileChange} className=" mb-4 " />
                  </div>
                  <div className="max-w">
                    <table className="w-full">
                      <thead className="w-full border-b-2 text-center">
                        <tr>
                          <td className="w-1/3 text-black">Görsel Adı</td>
                          <td className="w-1/3 text-black">Yüklenme Tarihi</td>
                          <td className="w-1/3 text-black">Düzenleme</td>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td>{imageFile?.name}</td>
                          <td>date</td>
                          <td className="flex">
                            <button
                              type="button"
                              className="mr-1 flex w-1/2 items-center justify-center rounded-lg  bg-red-600 px-3 py-1 text-center font-semibold text-white transition hover:bg-red-700 "
                            >
                              Sil
                            </button>
                            <button
                              type="button"
                              className="w-1/2 rounded-lg  bg-indigo-600 px-3 py-1 text-center font-semibold text-white  transition ease-in  hover:bg-indigo-700 "
                              onClick={() => {
                                setThisShow(false);
                                setShowImage(true);
                              }}
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
                <div className="w-full items-center space-y-4 p-4 text-gray-500 md:space-y-0">
                  <div className="mb-3 w-full max-w-sm text-left">
                    <h2 className="justify-start font-medium text-black">Teşhis</h2>
                  </div>
                  <div className="w-full max-w-sm">
                    <input
                      type="text"
                      id="user-info-phone"
                      className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-1 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Teşhisinizi Giriniz"
                      value={diagnosis}
                      onChange={handleDiagnosis}
                    />
                  </div>
                </div>
                <hr />
                <div className="w-full items-center space-y-4 px-4 py-2 text-gray-500 md:space-y-0">
                  <div className="mb-3 w-full max-w-sm text-left">
                    <h2 className="justify-start font-medium text-black">Yorum</h2>
                  </div>
                  <div className="max-w">
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-sm text-gray-900"
                      placeholder="Yorumunuzu Yazın"
                      value={description}
                      onChange={handleDescription}
                    ></textarea>
                  </div>
                </div>
                <hr />
                <div className="ml-auto w-full px-4 pb-4 text-gray-500 md:w-1/3">
                  <button
                    type="submit"
                    className="w-full rounded-lg  bg-blue-600 px-4 py-2 text-center font-semibold text-white transition duration-200 ease-in hover:bg-blue-700 "
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default ReportDetails;
