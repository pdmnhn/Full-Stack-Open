import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const modifyPerson = (id, modifiedPerson) => {
  return axios.put(`${baseURL}/${id}`, modifiedPerson).then((res) => res.data);
};

const all = { getAll, create, deletePerson, modifyPerson };
export default all;
