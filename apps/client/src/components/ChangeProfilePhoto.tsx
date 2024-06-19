import { useQueryClient } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { FaCamera } from 'react-icons/fa'
import { useToast } from '../context/toast'
import { EnumFilePathPrefix, MeDocument } from '../gql/graphql'
import { ChangeProfilePhotoMutationDocument } from '../graphql/mutations'
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload'
import useCompressor from '../hooks/useCompressor'
import { useMeQuery } from '../hooks/useMeQuery'
import Button from '../shared/Button'
import Spinner from '../shared/Spinner'
import { getCroppedImg } from '../utils/cropImage'
import { dataURLtoFile } from '../utils/dataURLtoFile'
import { getQueryKey, useGqlMutation } from '../utils/react-query-gql'

interface ChangeProfilePhotoProps {
  username: string
}

const ChangeProfilePhoto: React.FC<ChangeProfilePhotoProps> = ({
  username,
}) => {
  const { currentUser } = useMeQuery()

  const toast = useToast()

  const inputRef = useRef<HTMLInputElement>(null)

  const [imgSrc, setImgSrc] = useState(currentUser?.imgURL)
  const [croppedArea, setCroppedArea] = useState<Area | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [image, setImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { uploadToCloudinary } = useCloudinaryUpload()

  const compress = useCompressor()

  const queryClient = useQueryClient()

  const { mutate: changeProfilePhoto } = useGqlMutation(
    ChangeProfilePhotoMutationDocument,
    {
      onSuccess: (data) => {
        if (data?.changeProfilePhoto) {
          setImage(null)
          toast('Profile photo updated')

          queryClient.invalidateQueries({ queryKey: getQueryKey(MeDocument) })
        } else {
          setSubmitting(false)
        }
      },
    }
  )

  const openFileSelector = () => {
    inputRef.current?.click()
  }

  const onCropComplete = (
    _croppedAreaPercentage: any,
    croppedAreaPixels: Area
  ) => {
    setCroppedArea(croppedAreaPixels)
  }

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()
      setFileName(event.target.files[0].name)
      reader.readAsDataURL(event.target.files[0])
      reader.addEventListener('load', () => {
        setSubmitting(false)
        setImage(reader.result as any)
      })
    }
  }

  const setCroppedImage = async () => {
    setSubmitting(true)
    const croppedImageCanvas = await getCroppedImg(image!, croppedArea!)
    croppedImageCanvas.toBlob((blob) => {
      setImgSrc(URL.createObjectURL(blob!))
    })
    const imgURL = croppedImageCanvas.toDataURL()
    const fileToSend = dataURLtoFile(imgURL, fileName)
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
          )
          changeProfilePhoto({
            uploadResult,
          })
        },
        error: (err) => {
          alert(err.message)
          setSubmitting(false)
        },
      })
    } catch (err) {
      setSubmitting(false)
      // console.log(err);
    }
  }

  return (
    <div className='py-5'>
      {image ? (
        <div className='fixed left-0 top-0 z-30 h-screen w-screen bg-black bg-opacity-50'>
          <div className='relative mx-auto mt-20 h-80 w-full md:w-6/12'>
            {submitting && (
              <div className='absolute left-0 top-0 z-40 flex h-full w-full items-center bg-white bg-opacity-50'>
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
              className='absolute -bottom-5 left-1/2 z-50 mt-2 -translate-x-1/2 transform'
              color='dark'
              onClick={setCroppedImage}
            >
              Set Profile Image
            </Button>
          </div>
        </div>
      ) : (
        <div className='md:grid-cols-2-form mb-5 grid grid-cols-2 items-center gap-5 md:gap-10'>
          <div
            onClick={openFileSelector}
            className='ml-auto mr-auto h-28 w-28 transform cursor-pointer rounded-full border-2 border-gray-500 transition-all duration-300 hover:scale-110 hover:border-green-600 md:mr-0'
          >
            <img
              className='h-full w-full rounded-full'
              src={imgSrc}
              alt='profile_photo_sample_display'
            />
            <div className='relative w-full py-3'>
              <Button
                onClick={openFileSelector}
                className='absolute -top-5 left-0 right-0 ml-auto mr-auto w-10'
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
  )
}

export default ChangeProfilePhoto
