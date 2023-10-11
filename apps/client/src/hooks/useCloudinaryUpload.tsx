import { useApolloClient } from '@apollo/client';
import {
  CloudinaryUploadResult,
  EnumFilePathPrefix,
  GetUploadSignatureDocument,
  GetUploadSignatureQuery,
  GetUploadSignatureQueryVariables,
} from '../generated/graphql';
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from '../utils/constants';
import { useState } from 'react';

export const useCloudinaryUpload = () => {
  const apolloClient = useApolloClient();

  const [uploading, setUploading] = useState(false);

  const getUploadSignature = async (pathPrefix: EnumFilePathPrefix) => {
    const res = await apolloClient.query<
      GetUploadSignatureQuery,
      GetUploadSignatureQueryVariables
    >({
      query: GetUploadSignatureDocument,
      variables: { pathPrefix },
      fetchPolicy: 'network-only',
    });

    return res.data.getUploadSignature;
  };

  const uploadToCloudinary = async (
    pathPrefix: EnumFilePathPrefix,
    file: File
  ): Promise<CloudinaryUploadResult> => {
    setUploading(true);
    const { publicId, signature, timestamp } = await getUploadSignature(
      pathPrefix
    );
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('timestamp', String(timestamp));
    formData.append('signature', signature);
    formData.append('public_id', publicId);

    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    setUploading(false);

    return {
      publicId: data.public_id,
      signature: data.signature,
      version: data.version,
    };
  };

  return { uploadToCloudinary, uploading };
};
