// auth.js
import axios from 'axios'


const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.STERLING_BASE_URL}/auth/token`,
      {
        client_id: process.env.STERLING_API_KEY,
        client_secret: process.env.STERLING_API_SECRET,
        grant_type: process.env.STERLING_BASE_URL,
      }
    );
    console.log(response,"response");
    
    return response.data.access_token;
  } catch (error) {
   console.log(error,"error");
   
    // throw new Error("Authentication failed");
  }
};

export default getAccessToken;