import imageCompression from 'browser-image-compression';

const compressImage = async (imageFile: any) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: false,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    return null;
  }
};

export default compressImage;
