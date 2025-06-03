const API_KEY = "wxm9emsli283mnven";
import axios from "axios";
const BASE_URL = "https://techhk.aoscdn.com";

export const enhancedimageApi = async (file) => {
  //code to call api and get enhanced image URL
  try {
    const taskId = await uploadImage(file);
    console.log("Image uploaded successfully, Task ID:",taskId)


    //polling

    const enhancedImageData = await PollForEnhancedImage(taskId);
    console.log("Enhanced image data:", enhancedImageData);

    
    return enhancedImageData;
  } catch (error) {
    console.log("Error enhancing image", error.message);
  }
};

const uploadImage = async (file) => {
  //code to upload image
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-Key": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image! Task ID not found.");
  }
  return data.data.task_id;
};

const fetchEnhancedImage = async (taskId) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
    {
      headers: {
        "X-API-Key": API_KEY,
      },
    }
  );
  if (!data?.data) {
    throw new Error("Failed to fetch enhanced image! Image not found.");
  }
  return data.data;
  //"/api/tasks/visual/scale/{task_id}" get API
};


const PollForEnhancedImage = async (taskId, retries=0) => {
  const result = await fetchEnhancedImage(taskId);


  if(result.state === 4){
    console.log("Processing...");

    if(retries >= 20) {
        throw new Error("Max retries reached. Please try again later.");
    }

    //wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return PollForEnhancedImage(taskId, retries + 1);

  }
  console.log("Enhanced imag URL:", result);
  return result;
};




// data
// :
// task_id
// :
// "fa0dea81-0586-49bb-aa96-24f9574e2639"
// [[Prototype]]
// :
// Object
// message
// :
// "success"
// status
// :
// 200
