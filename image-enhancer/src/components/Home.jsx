import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { useState } from "react";
import {enhancedimageApi} from "../utils/enhancedimageApi";

const Home = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setloading] = useState(false);

  const UploadImageHandler = async (file) => {
    
    
    setUploadImage(URL.createObjectURL(file));
    setloading(true);
    
    try{
      const enhancedURL = await enhancedimageApi(file);
      setEnhancedImage(enhancedURL);
      setloading(false);
      //code which may produce error
    } catch(error){
      console.log(error);
      alert("Something went wrong. Please try again later");
      //code to handle error and show message
    }
    
  };


  return (
    <>
      <ImageUpload  UploadImageHandler={UploadImageHandler} />
      <ImagePreview
        loading={loading}
        uploaded={uploadImage}
        enhanced={enhancedImage}
      />
    </>
  );
};

export default Home;



//49:34