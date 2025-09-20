import axios from "axios";

// Determine the API base URL based on environment
const getBaseURL = () => {
  const isProduction = import.meta.env.PROD;
  const envUrl = import.meta.env.VITE_API_URL;
  const defaultProdUrl = 'https://ai-saathi-backend.onrender.com';
  const devUrl = 'https://ai-saathi-backend.onrender.com'; // Use Render backend even in dev
  
  let baseURL;
  if (isProduction) {
    baseURL = envUrl || defaultProdUrl;
  } else {
    // For local development, use Render backend instead of localhost
    baseURL = envUrl || devUrl;
  }
  
  console.log('🌍 Environment:', isProduction ? 'Production' : 'Development');
  console.log('🔗 API Base URL:', baseURL);
  console.log('📝 VITE_API_URL:', envUrl);
  
  return baseURL;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 30000, // 30 second timeout for Render backend
  headers: {
    'Content-Type': 'application/json',
  },
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
