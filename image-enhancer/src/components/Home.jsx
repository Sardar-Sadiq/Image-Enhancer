
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import { useState } from 'react'

const Home = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const[enhancedImage, setEnhancedImage] =useState(null);
  return (
    <>
    <ImageUpload/>
    <ImagePreview/>
    </>
  )
}

export default Home
