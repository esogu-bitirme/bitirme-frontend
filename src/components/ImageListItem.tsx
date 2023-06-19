import React from 'react';

export const ImageListItem = ({ image }: { image: any }) => {
  return (
    <>
      <tr>
        <td>{image.name}</td>
        <td>{image.description}</td>
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
              //setThisShow(false);
              //setShowImage(true);
            }}
          >
            Görüntüle
          </button>
        </td>
      </tr>
    </>
  );
};
