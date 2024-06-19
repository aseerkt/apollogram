import { useState } from 'react'
import { CloudinaryUploadResult, EnumFilePathPrefix } from '../gql/graphql'
import { GetUploadSignatureQueryDocument } from '../graphql/queries'
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from '../utils/constants'
import { gqlClient } from '../utils/react-query-gql'

const getUploadSignature = async (pathPrefix: EnumFilePathPrefix) => {
  const data = await gqlClient.request(GetUploadSignatureQueryDocument, {
    pathPrefix,
  })
  return data.getUploadSignature
}

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false)

  const uploadToCloudinary = async (
    pathPrefix: EnumFilePathPrefix,
    file: File
  ): Promise<CloudinaryUploadResult> => {
    setUploading(true)

    const { publicId, signature, timestamp } =
      await getUploadSignature(pathPrefix)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', CLOUDINARY_API_KEY)
    formData.append('timestamp', String(timestamp))
    formData.append('signature', signature)
    formData.append('public_id', publicId)

    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    setUploading(false)

    return {
      publicId: data.public_id,
      signature: data.signature,
      version: data.version,
    }
  }

  return { uploadToCloudinary, uploading }
}
