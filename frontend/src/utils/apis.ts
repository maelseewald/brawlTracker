import { Configuration, PlayerApi, PlayerlistApi } from '../../generated';

const config = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL,
});

export const playerApi = new PlayerApi(config);
export const playerListApi = new PlayerlistApi(config);
