import { useCallback } from 'react';
import Compressor from 'compressorjs';

function useCompressor() {
  return useCallback(
    (file: File | Blob, options: Compressor.Options | undefined) => {
      new Compressor(file, options);
    },
    []
  );
}

export default useCompressor;
