import axios from 'axios';

const BASE_URL = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const addPost = async (body) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(BASE_URL, body, config);
  return response.data;
};

const updatePost = async (id, body) => {
  const response = axios.patch(`${BASE_URL}/update/${id}`, body);
  return response.data;
};

const deletePost = async (id) => {
  const response = axios.delete(`${BASE_URL}/delete/${id}`);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, addPost, updatePost, deletePost, setToken,
};
