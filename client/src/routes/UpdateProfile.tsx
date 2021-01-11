import React, { useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import Button from '../components-ui/Button';
import InputField from '../components-ui/InputField';
import FormWrapper from '../containers/FormWrapper';
import { getCroppedImg } from '../utils/cropImage';
import { dataURLtoFile } from '../utils/dataURLtoFile';
import { MeDocument, useUpdateProfileMutation } from '../generated/graphql';
import { FaCamera } from 'react-icons/fa';
import { apolloClient } from '..';

const UpdateProfile: React.FC = () => {
  const { me } = apolloClient.readQuery({ query: MeDocument });

  const triggerFileSelectPopup = () => inputRef.current?.click();

  const [fullName, setFullName] = useState<string>(me.fullName);
  const imgSrc =
    me.imgURL === '/user.jpeg'
      ? '/user.jpeg'
      : `${process.env.REACT_APP_EXPRESS_URI}${me.imgURL}`;
  const [displayImage, setDisplayImage] = useState(imgSrc);
  const inputRef = useRef<HTMLInputElement>(null);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File>(null as any);
  const [fileName, setFileName] = useState('');

  const [updateProfile] = useUpdateProfileMutation();

  const onCropComplete = (
    _croppedAreaPercentage: any,
    croppedAreaPixels: Area
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      setFileName(event.target.files[0].name);
      reader.addEventListener('load', () => {
        setImage(reader.result as any);
      });
    }
  };

  const setCroppedImage = async () => {
    const croppedImageCanvas = await getCroppedImg(image!, croppedArea!);
    croppedImageCanvas.toBlob((blob) => {
      setDisplayImage(URL.createObjectURL(blob));
      setImage(null);
    });
    const imgURL = croppedImageCanvas.toDataURL();
    setFile(dataURLtoFile(imgURL, fileName));
  };
  console.log(file);

  return (
    <FormWrapper title='Update Profile'>
      <div className='p-4 '>
        {image ? (
          <div className='h-80'>
            <div className='relative h-60'>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <Button
              className='mt-2'
              fullWidth
              color='dark'
              onClick={setCroppedImage}
            >
              Set Profile Image
            </Button>
          </div>
        ) : (
          <div>
            <div
              onClick={() => {
                inputRef.current?.click();
              }}
              className='mx-auto mb-3 overflow-hidden transform border-2 border-gray-500 rounded-full cursor-pointer hover:border-green-600 hover:scale-110 w-28 h-28'
            >
              <img src={displayImage} alt='profile_photo_sample_display' />
            </div>
            <div className='relative w-full py-3'>
              <Button
                onClick={triggerFileSelectPopup}
                className='absolute left-0 right-0 w-10 ml-auto mr-auto -top-5'
                title='Choose Profile Image'
              >
                <FaCamera />
              </Button>
            </div>
            <div className='container-buttons'>
              <input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={onSelectFile}
                hidden
              />
              <InputField
                error={null}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder='Full Name'
              />
            </div>
            <div className='mt-4'>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await updateProfile({
                      variables: { file, fullName },
                    });
                    console.log(res);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                <Button type='submit' color='dark' fullWidth>
                  Upload Profile
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </FormWrapper>
  );
};

export default UpdateProfile;
