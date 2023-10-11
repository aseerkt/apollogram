import React, { useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { FaCamera } from 'react-icons/fa';
import {
  EnumFilePathPrefix,
  MeDocument,
  useChangeProfilePhotoMutation,
  useMeQuery,
} from '../generated/graphql';
import Button from '../shared/Button';
import { getCroppedImg } from '../utils/cropImage';
import { dataURLtoFile } from '../utils/dataURLtoFile';
import Spinner from '../shared/Spinner';
import { useMessageCtx } from '../context/MessageContext';
import useCompressor from '../hooks/useCompressor';
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload';

interface ChangeProfilePhotoProps {
  username: string;
}

const ChangeProfilePhoto: React.FC<ChangeProfilePhotoProps> = ({
  username,
}) => {
  const { data: meData } = useMeQuery();

  const { setMessage } = useMessageCtx();

  const inputRef = useRef<HTMLInputElement>(null);

  const [imgSrc, setImgSrc] = useState(meData?.me?.imgURL);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { uploadToCloudinary } = useCloudinaryUpload();

  const compress = useCompressor();
  const [changeProfilePhoto] = useChangeProfilePhotoMutation();

  const openFileSelector = () => {
    inputRef.current?.click();
  };

  const onCropComplete = (
    _croppedAreaPercentage: any,
    croppedAreaPixels: Area
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      setFileName(event.target.files[0].name);
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        setSubmitting(false);
        setImage(reader.result as any);
      });
    }
  };

  const setCroppedImage = async () => {
    setSubmitting(true);
    const croppedImageCanvas = await getCroppedImg(image!, croppedArea!);
    croppedImageCanvas.toBlob((blob) => {
      setImgSrc(URL.createObjectURL(blob!));
    });
    const imgURL = croppedImageCanvas.toDataURL();
    const fileToSend = dataURLtoFile(imgURL, fileName);
    try {
      // console.log(res);
      compress(fileToSend, {
        width: 180,
        height: 180,
        mimeType: 'image/jpeg',
        success: async (result) => {
          const uploadResult = await uploadToCloudinary(
            EnumFilePathPrefix.Profiles,
            result as File
          );
          const res = await changeProfilePhoto({
            variables: { uploadResult },
            refetchQueries: [{ query: MeDocument }],
          });
          if (res.data?.changeProfilePhoto) {
            setImage(null);
            setMessage('Profile photo updated');
          } else {
            setSubmitting(false);
          }
        },
        error: (err) => {
          alert(err.message);
          setSubmitting(false);
        },
      });
    } catch (err) {
      setSubmitting(false);
      // console.log(err);
    }
  };

  return (
    <div className='py-5'>
      {image ? (
        <div className='fixed top-0 left-0 z-30 w-screen h-screen bg-black bg-opacity-50'>
          <div className='relative w-full mx-auto mt-20 md:w-6/12 h-80'>
            {submitting && (
              <div className='absolute top-0 left-0 z-40 flex items-center w-full h-full bg-white bg-opacity-50'>
                <Spinner />
              </div>
            )}
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <Button
              disabled={submitting}
              isLoading={submitting}
              className='absolute z-50 mt-2 transform -translate-x-1/2 -bottom-5 left-1/2'
              color='dark'
              onClick={setCroppedImage}
            >
              Set Profile Image
            </Button>
          </div>
        </div>
      ) : (
        <div className='grid items-center grid-cols-2 gap-5 mb-5 md:grid-cols-2-form md:gap-10'>
          <div
            onClick={openFileSelector}
            className='ml-auto mr-auto transform border-2 border-gray-500 rounded-full cursor-pointer md:mr-0 hover:border-green-600 transition-all duration-300 hover:scale-110 w-28 h-28'
          >
            <img
              className='w-full h-full rounded-full'
              src={imgSrc}
              alt='profile_photo_sample_display'
            />
            <div className='relative w-full py-3'>
              <Button
                onClick={openFileSelector}
                className='absolute left-0 right-0 w-10 ml-auto mr-auto -top-5'
                title='Choose Profile Image'
              >
                <FaCamera />
              </Button>
            </div>
          </div>
          <div>
            <input
              type='file'
              accept='image/*'
              ref={inputRef}
              onChange={onSelectFile}
              hidden
            />
            <div>
              <p className='mb-1 text-2xl'>{username}</p>
              <Button onClick={openFileSelector}>Change Profile Photo</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeProfilePhoto;
