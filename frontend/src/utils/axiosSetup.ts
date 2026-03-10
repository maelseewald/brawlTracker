import globalAxios from 'axios';

const axiosSetup = () => {
  globalAxios.defaults.baseURL = '/api';
};

export default axiosSetup;
