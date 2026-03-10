import globalAxios from 'axios';

const axiosSetup = () => {
  // Im Dev-Modus: VITE_API_BASE_URL="" → Vite-Proxy leitet /api weiter
  // In Produktion: VITE_API_BASE_URL="" → nginx leitet /api weiter (same-origin)
  const baseURL = import.meta.env.VITE_API_BASE_URL ?? '';
  globalAxios.defaults.baseURL = baseURL + '/api';
};

export default axiosSetup;
