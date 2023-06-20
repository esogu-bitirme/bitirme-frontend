import React from 'react';
import { Image } from '../types/image';
import { ToastContainer, toast } from 'react-toastify';

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
  setAllImages: React.Dispatch<React.SetStateAction<Image[]>> | null;
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
          })
          .catch((e) => {
            toast.error('Bir hata meydana geldi!', {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      })
      .catch((e) => {
        toast.error('Bir hata meydana geldi!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <>
      <tr className="table w-full table-fixed border-b text-center">
        <td>{image.name}</td>
        <td>{image.description}</td>
        <td className="flex items-center justify-center">
          {setAllImages ? (
            <button
              type="button"
              className="mr-1  w-1/2   rounded-lg bg-red-600  px-2  py-1 text-center text-xs font-semibold text-white transition hover:bg-red-700 "
              onClick={handleDelete}
            >
              Sil
            </button>
          ) : null}
          <button
            type="button"
            className={`w-1/2 rounded-lg  bg-blue-600 px-2  py-1 text-center text-xs font-semibold text-white  transition ease-in  hover:bg-blue-700 `}
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
