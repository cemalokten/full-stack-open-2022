import axios from 'axios';

const BASE_URL = '/api/login';

const login = async ({ username, password }) => {
  const request = await axios.post(BASE_URL, { username, password });
  return request;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default login;
