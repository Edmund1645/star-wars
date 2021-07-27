import axios from 'axios';

export default axios.create({
  baseURL: 'https://swapi.dev/api',
});

export const fetchCharacter = (url: string) => {
  return axios.get(url);
};
