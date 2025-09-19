import axios from "axios";

// Determine the API base URL based on environment
const getBaseURL = () => {
  const isProduction = import.meta.env.PROD;
  const envUrl = import.meta.env.VITE_API_URL;
  const defaultProdUrl = 'https://ai-saathi-backend.onrender.com';
  const devUrl = 'http://localhost:5000';
  
  // Force production URL for now to test
  let baseURL = defaultProdUrl;
  
  console.log('🌍 Environment:', isProduction ? 'Production' : 'Development');
  console.log('🔗 API Base URL:', baseURL);
  console.log('📝 VITE_API_URL:', envUrl);
  console.log('🚀 FORCED to use production URL for testing');
  
  return baseURL;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('📤 Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('📥 API Error:', error.response?.status, error.response?.statusText, error.config?.url);
    console.error('📥 Error Details:', error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
