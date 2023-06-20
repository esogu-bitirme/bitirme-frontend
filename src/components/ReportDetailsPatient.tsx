import React, { ChangeEvent, useState, useEffect } from 'react';
import ImageDetails from './ImageDetails';
import { Report } from '../types/report';
import { ToastContainer, toast } from 'react-toastify';
import { Image } from '../types/image';
import { ImageListItem } from './ImageListItem';

const ReportDetailsPatient = ({
  report,
  showReportDetails,
  setShowReportDetails,
}: {
  report: Report | any;
  showReportDetails: boolean;
  setShowReportDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [thisShow, setThisShow] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [allImages, setAllImages] = useState<Image[] | undefined>();
  const [closeStrokeWidth, setCloseStrokeWidth] = useState(1.5);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);
  useEffect(() => {
    fetch('https://localhost:50198/api/image/report/' + report.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllImages(data);
      });
  }, []);
  return (
    <>
      {showImage ? (
        <ImageDetails
          setShowImage={setShowImage}
          showImage={showImage}
          setShowReportDetails={setThisShow}
          imageData={currentImage} // TODO
        />
      ) : null}
      {showReportDetails && thisShow ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-zinc-800 bg-opacity-60">
          <section className="w-full">
            <div className="container mx-auto max-w-2xl shadow-md md:w-3/4">
              <div className="flex justify-between rounded-t-lg border-t-2 border-blue-400 bg-white p-4 ">
                <div>
                  <div className="mx-auto max-w-sm md:mx-0 md:w-full">
                    Rapor Numarası : {report?.id}
                  </div>
                  <div className="mx-auto max-w-sm md:mx-0 md:w-full">
                    Rapor Oluşturma Tarihi : {new Date(report.createDate).toLocaleString('en-GB')}
                  </div>
                </div>
                <button
                  className="m-0 mr-2 mt-2 h-fit p-0 font-bold"
                  onClick={() => {
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
                  </div>

                  <div className="max-w">
                    <table className="w-full min-w-full leading-normal">
                      <thead className="table w-full table-fixed border-b-2 text-center">
                        <tr>
                          <td className="w-1/3 text-black">Görsel Adı</td>
                          <td className="w-1/3 text-black">Açıklama</td>
                          <td className="w-1/3 text-black">Düzenleme</td>
                        </tr>
                      </thead>
                      <tbody className="block max-h-48 overflow-y-scroll">
                        {allImages?.map((image) => (
                          <ImageListItem
                            image={image}
                            setShowImage={setShowImage}
                            setThisShow={setThisShow}
                            reportId={report.id}
                            setAllImages={null}
                            setCurrentImage={setCurrentImage}
                          />
                        ))}
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
                      className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-1 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                      value={report?.diagnosis}
                      disabled
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
                      value={report?.description}
                      disabled
                    ></textarea>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default ReportDetailsPatient;
