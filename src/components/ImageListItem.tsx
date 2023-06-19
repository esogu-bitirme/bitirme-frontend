import React from 'react';
import { Image } from '../types/image';

export const ImageListItem = ({
  image,
  setThisShow,
  setShowImage,
  setCurrentImage,
  setAllImages,
  reportId,
}: {
  image: Image;
  setThisShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImage: React.Dispatch<React.SetStateAction<any>>;
  setAllImages: React.Dispatch<React.SetStateAction<Image[]>>;
  reportId: number;
}) => {
  const handleDelete = () => {
    fetch(`https://localhost:50198/api/image/${image.path}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.text())
      .then((data) => {
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
  };
  return (
    <>
      <tr className="table w-full table-fixed border-b">
        <td>{image.name}</td>
        <td>{image.description}</td>
        <td className="flex">
          <button
            type="button"
            className="mr-1  w-1/2   rounded-lg bg-red-600  px-2 py-1 text-center text-sm font-semibold text-white transition hover:bg-red-700 "
            onClick={handleDelete}
          >
            Sil
          </button>
          <button
            type="button"
            className="w-1/2 rounded-lg  bg-indigo-600 px-3 py-1 text-center text-xs font-semibold text-white  transition ease-in  hover:bg-indigo-700 "
            onClick={() => {
              // setThisShow(false);
              setShowImage(true);
              setCurrentImage(image);
            }}
          >
            Görüntüle
          </button>
        </td>
      </tr>
    </>
  );
};
