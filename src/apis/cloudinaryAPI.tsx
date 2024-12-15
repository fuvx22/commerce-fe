import { useState } from "react";
import axios from "axios";

const CLOUDDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const useCloudinaryAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadImage = async (file: File) => {
    setIsLoading(true);
    try {
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDDINARY_UPLOAD_PRESET);
      const response = await axios.post(CLOUDDINARY_URL, formData);
      return response.data;

    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };
  return { uploadImage, isLoading };
};

export { useCloudinaryAPI };
