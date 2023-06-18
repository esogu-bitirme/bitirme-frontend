import React, { useState } from 'react';

const ImageDetails = ({
  setShowImage,
  showImage,
  setShowReportDetails,
}: {
  showImage: boolean;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReportDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [closeStrokeWidth, setCloseStrokeWidth] = useState(1.5);
  return (
    <>
      {showImage ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-zinc-800 bg-opacity-60">
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
            <h2 className="pl-4">image name</h2>
            <img className="h-auto max-h-96 p-4" src="./placeholder.PNG" alt="image name" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImageDetails;
