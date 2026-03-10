import globalAxios from 'axios';

const axiosSetup = () => {
  globalAxios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
};

export default axiosSetup;
