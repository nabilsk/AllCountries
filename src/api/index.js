import api from './config';

export const countryList = async () => {
  let response = await api.get('/all');
  return response;
};

export const singleCountry = async name => {
  let response = await api.get(`/name/${name}`);
  return response;
};

export const filterRegion = async region => {
  let response = await api.get(`/region/${region}`);
  return response;
};
