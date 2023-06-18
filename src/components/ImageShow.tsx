import React from 'react';

const ImageShow = ({
  setShowImage,
  showImage,
  setShowReportDetails,
}: {
  showImage: boolean;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReportDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {showImage ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-zinc-800 bg-opacity-60">
          <section className="w-full">
            <div className="container mx-auto max-w-2xl shadow-md md:w-3/4">
              <div className="flex justify-between">
                <h2>image name</h2>
                <img src="image url" alt="image name" />
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default ImageShow;
