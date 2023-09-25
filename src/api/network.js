import axios from 'axios';
import { API_HOST, API_KEY } from '../utils/constants';

export const get = (url, params) => {
  let setParams = params
    ? { api_key: API_KEY, ...params }
    : { api_key: API_KEY };
  return axios
    .get(API_HOST + url, {
      headers: {
        accept: 'application/json',
      },
      params: setParams,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
