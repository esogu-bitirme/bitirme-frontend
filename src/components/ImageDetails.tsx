import React, { useContext, useEffect, useState } from 'react';
import { Image } from '../types/image';
import { Predict } from '../types/predict';
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const ImageDetails = ({
  setShowImage,
  showImage,
  setShowReportDetails,
  imageData,
}: {
  showImage: boolean;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReportDetails: React.Dispatch<React.SetStateAction<boolean>>;
  imageData: Image | undefined;
}) => {
  const [closeStrokeWidth, setCloseStrokeWidth] = useState(1.5);
  const [predict, setPredict] = useState<Predict>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!showImage) {
      return;
    }
    fetch(`https://localhost:50198/api/image/display/${imageData?.path}`)
      .then((response) => {
        response.blob();
      })
      .then((blob) => {})
      .catch((e) => {
        toast.error('Bir hata meydana geldi!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, [showImage]);

  const handlePredict = () => {
    setIsLoading(true);
    fetch(`http://localhost:8000/${imageData?.path}`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPredict(data);
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error('Bir hata meydana geldi!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      });
  };
  return (
    <>
      {showImage ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-zinc-800 bg-opacity-60">
          <div className="flex max-w-3xl flex-col  rounded bg-white">
            <div className="w-full text-end">
              <button
                className="m-0 mr-2 mt-2 h-fit p-0 font-bold"
                onClick={() => {
                  setShowImage(false);
                  setShowReportDetails(true);
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
            <div className="p-5">
              <h2 className="inline-block pl-4">
                <b>Dosya İsmi :</b> {imageData?.name}
              </h2>
              <div className="flex">
                <img
                  className="h-auto max-h-96 p-4"
                  src={`https://localhost:50198/api/image/display/${imageData?.path}`}
                  alt="image name"
                />
                {authContext.userType == 'DOCTOR' && (
                  <div className="p-4">
                    <button
                      className="m-4 ml-0 h-10 w-40 rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white transition duration-200 ease-in hover:bg-blue-700 "
                      onClick={handlePredict}
                    >
                      {isLoading ? (
                        <div className="text-center">
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="mr-2 inline h-6 w-6 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        'Teşhis Et!'
                      )}
                    </button>

                    {predict && (
                      <div>
                        <b>Tahmin sonuçları : </b> <hr></hr>
                        İyi Huylu: %{(predict?.benign * 100).toFixed(2)} <br></br>
                        Kötü Huylu: %{(predict?.malignant * 100).toFixed(2)} <br></br>
                        Normal: %{(predict?.normal * 100).toFixed(2)} <br></br>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImageDetails;
