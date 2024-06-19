import { useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaCameraRetro } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/toast'
import {
  CloudinaryUploadResult,
  EnumFilePathPrefix,
  GetExplorePostsDocument,
} from '../gql/graphql'
import { AddPostMutationDocument } from '../graphql/mutations'
import { GetUserQueryDocument } from '../graphql/queries'
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload'
import useCompressor from '../hooks/useCompressor'
import Button from '../shared/Button'
import Card from '../shared/Card'
import {
  getCacheKey,
  getQueryKey,
  useGqlMutation,
} from '../utils/react-query-gql'

type AddPostProps = {
  className?: string
  onClose: () => void
}

const AddPost: React.FC<AddPostProps> = ({ className, onClose }) => {
  const toast = useToast()

  const [caption, setCaption] = useState('')
  const [uploadResult, setUploadResult] = useState<CloudinaryUploadResult>()

  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState('')

  const navigate = useNavigate()
  const compress = useCompressor()
  const { uploadToCloudinary, uploading } = useCloudinaryUpload()

  const queryClient = useQueryClient()

  const { mutate: addPost, isPending: submitting } = useGqlMutation(
    AddPostMutationDocument,
    {
      onSuccess: (data) => {
        if (data?.addPost.post) {
          onClose()
          toast('Post uploaded successfully')
          navigate(`/p/${data.addPost.post.id}`)
          queryClient.invalidateQueries({
            queryKey: [getCacheKey(GetExplorePostsDocument)],
          })
          queryClient.invalidateQueries({
            queryKey: getQueryKey(GetUserQueryDocument, {
              username: data.addPost.post.user.username,
            }),
          })
        }
      },
    }
  )

  const handleDrop = useCallback((files: File[]) => {
    if (!files[0].type.includes('image')) {
      setUploadError('Unsupported file format (Supported: JPEG/JPG/PNG)')
      return
    }
    compress(files[0], {
      width: 600,
      mimeType: 'image/jpeg',
      success: async (result) => {
        const res = await uploadToCloudinary(
          EnumFilePathPrefix.Posts,
          result as File
        )
        if (res.publicId) {
          setUploadResult(res)
          setImgSrc(URL.createObjectURL(files[0]))
        }
      },
      error: (err) => {
        setUploadError(err.message)
      },
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!uploadResult) {
      return setUploadError('Please upload file')
    }
    addPost({ caption, uploadResult })
  }

  const submitDisabled = !imgSrc || !caption

  return (
    <Card className={`p-5 ${className}`}>
      <h1 className='mb-3 mt-1 text-xl font-semibold uppercase'>Upload Post</h1>
      <form onSubmit={onSubmit}>
        <div className='mb-5'>
          <label className='mb-1 inline-block font-bold' htmlFor='caption'>
            Caption
          </label>
          <div>
            <input
              id='caption'
              name='caption'
              placeholder='Add caption for your post...'
              className='mb-3 w-full rounded-md border border-gray-300 bg-blue-50 px-2 py-1 focus:border-gray-500'
              autoFocus
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <small className='block leading-4 text-gray-500'>
              Give your post a catchy caption
            </small>
            {/* <small className='my-1 text-red-700'>{error}</small> */}
          </div>
          {imgSrc && (
            <div className='mt-2' style={{ height: 'calc(100vh - 400px)' }}>
              <img className='h-full' src={imgSrc} alt='Upload preview' />
            </div>
          )}
        </div>
        <div
          className='my-2 mb-5 cursor-pointer rounded border border-blue-400 p-5 text-gray-700 hover:bg-gray-100'
          {...getRootProps()}
        >
          <input
            type='file'
            {...getInputProps()}
            accept='image/*'
            multiple={false}
          />

          {uploading ? (
            <small className='text-center text-sm uppercase'>
              Uploading...
            </small>
          ) : uploadError ? (
            <small className='my-1 text-red-700'>{uploadError}</small>
          ) : isDragActive ? (
            <p className='text-center text-sm uppercase'>
              Drop the files here ...
            </p>
          ) : (
            <p className='flex items-center justify-center text-sm uppercase'>
              <FaCameraRetro className='mr-3 text-gray-500' size='2em' />
              click to browse or drop file here
            </p>
          )}
        </div>

        <Button
          isLoading={submitting}
          className='mx-auto block'
          color='dark'
          type='submit'
          disabled={submitDisabled}
        >
          Upload
        </Button>
      </form>
    </Card>
  )
}

export default AddPost
