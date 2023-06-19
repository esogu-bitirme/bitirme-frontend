import React, { ChangeEvent, useState, useEffect, useContext } from 'react';
import ImageDetails from './ImageDetails';
import { Report } from '../types/report';
import AuthContext from '../context/AuthContext';
import { ImageListItem } from './ImageListItem';
import { Patient } from '../types/patient';

const images: any = [];

const ReportDetails = ({
  report,
  showReportDetails,
  setShowReportDetails,
  setShowPatientReports,
  patient,
}: {
  report: Report | any;
  showReportDetails: boolean;
  setShowReportDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPatientReports: React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient | undefined;
}) => {
  const [thisShow, setThisShow] = useState(true);
  const [imageFile, setImageFile] = useState<File>();
  const [showImage, setShowImage] = useState(false);
  const [closeStrokeWidth, setCloseStrokeWidth] = useState(1.5);
  const [description, setDescription] = useState(report.description);
  const [diagnosis, setDiagnosis] = useState(report.diagnosis);
  const authContext = useContext(AuthContext);
  const [allImages, setAllImages] = useState(images);
  const [currentImage, setCurrentImage] = useState();
  const [imageName, setImageName] = useState('');
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };
  const uploadImageToServer = (patientId: number | undefined, reportId: number) => {
    if (imageName === '') {
      return;
    }
    const formData = new FormData();
    formData.append('file', imageFile as Blob);
    fetch(`https://localhost:50198/api/image/save-image`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + authContext.token,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
        return response.text();
      })
      .then((data) => {
        const imageBody = {
          name: imageName,
          description: '',
          path: data,
          patientId: patientId,
          reportId: reportId,
        };
        console.log(JSON.stringify(imageBody));

        fetch(`https://localhost:50198/api/image`, {
          method: 'POST',
          body: JSON.stringify(imageBody),
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + authContext.token,
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          console.log(response);
          fetch(`https://localhost:50198/api/image/report/${reportId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
            .then((response) => {
              if (!response.ok) {
                setAllImages([]); // TODO : fix this
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              setAllImages(data);
            });
        });
      });
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
  };

  const handleDiagnosis = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDiagnosis(inputValue);
  };

  useEffect(() => {
    fetch(`https://localhost:50198/api/image/report/${report.id}`, {
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
        setAllImages(data);
      });
  }, []);

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
        setShowPatientReports(true);
        setShowReportDetails(false);
      })
      .catch((err) => {});
  };

  return (
    <>
      {showImage ? (
        <ImageDetails
          setShowImage={setShowImage}
          showImage={showImage}
          setShowReportDetails={setThisShow}
          imageData={currentImage}
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
              <div className=" bg-white">
                <div className="w-full items-center  p-2 text-gray-500 md:space-y-0">
                  <div className="mb-2 flex w-full items-center justify-between">
                    <h2 className="flex max-w-sm font-bold text-black  ">Görseller</h2>
                    <div className="flex gap-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Görsel Adı"
                          className={`${
                            imageName === '' ? ' border-red-600 ' : 'border-gray-500 '
                          }w-full flex-1 appearance-none rounded-lg border   bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600`}
                          onChange={(e) => {
                            setImageName(e.target.value);
                          }}
                          value={imageName}
                        />
                        <p className={`text-xs ${imageName === '' ? '' : 'text-white'}`}>
                          Görsel ismi giriniz
                        </p>
                      </div>
                      <button
                        className="max-w-sm rounded-md bg-blue-500 p-2 text-right text-sm font-medium text-black"
                        onClick={() => {
                          uploadImageToServer(patient?.id, report.id);
                        }}
                      >
                        Görsel Yükle
                      </button>
                    </div>
                  </div>
                  <div className="float-right flex max-w-fit">
                    <input type="file" onChange={handleFileChange} className=" mb-4 " />
                  </div>
                  <div className="max-w">
                    <table className="w-full min-w-full leading-normal">
                      <thead className="table w-full table-fixed border-b-2 text-center">
                        <tr>
                          <td className="w-1/3 text-black">Görsel Adı</td>
                          <td className="w-1/3 text-black">Görsel Açıklaması</td>
                          <td className="w-1/3 text-black">Düzenleme</td>
                        </tr>
                      </thead>
                      <tbody className="block max-h-48 overflow-y-scroll">
                        {allImages.map((image: any) => (
                          <ImageListItem
                            image={image}
                            setShowImage={setShowImage}
                            setThisShow={setThisShow}
                            setCurrentImage={setCurrentImage}
                            setAllImages={setAllImages}
                            reportId={report.id}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr />
                <div className="w-full items-center  p-4 py-2 text-gray-500 md:space-y-0">
                  <div className="mb-1 w-full max-w-sm text-left">
                    <h2 className="justify-start font-medium text-black">Teşhis</h2>
                  </div>
                  <div className="w-full max-w-sm">
                    <input
                      type="text"
                      id="user-info-phone"
                      className=" w-full flex-1 appearance-none rounded-lg border border-gray-400 border-transparent bg-white px-1 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Teşhisinizi Giriniz"
                      value={diagnosis}
                      onChange={handleDiagnosis}
                    />
                  </div>
                </div>
                <hr />
                <div className="w-full items-center  px-4 py-2 text-gray-500 md:space-y-0">
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
                    className="w-full rounded-lg  bg-blue-600 px-4 py-2 text-center font-semibold text-white transition duration-200 ease-in hover:bg-blue-700 "
                    onClick={handleSaveClick}
                  >
                    Kaydet
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
