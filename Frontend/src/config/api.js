// API configuration
const getApiUrl = () => {
  const isProduction = import.meta.env.PROD;
  const envUrl = import.meta.env.VITE_API_URL;
  const defaultProdUrl = 'https://ai-saathi-backend.onrender.com';
  const devUrl = 'http://localhost:5000';
  
  if (isProduction) {
    return envUrl || defaultProdUrl;
  } else {
    return devUrl;
  }
};

export const API_BASE_URL = getApiUrl();

console.log('🔗 API_BASE_URL:', API_BASE_URL);