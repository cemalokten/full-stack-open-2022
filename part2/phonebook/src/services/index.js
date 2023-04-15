import axios from "axios";

const BASE_URL = "http://localhost:3001/api/persons";

const getPersons = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res;
  } catch (e) {
    if (e.response)
      console.log(`There has been an error getting ${e.response.data}`);
  }
};

const addPerson = async (newPerson) => {
  try {
    const res = await axios.post(BASE_URL, newPerson);
    return res;
  } catch (e) {
    throw e
  }
};

const deletePerson = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res;
  } catch (e) {
    if (e.response)
      console.log(`There has been an error deleting ${e.response.data}`);
  }
};

const updatePerson = async (person, id) => {
  try {
    console.log(id, 'updatePerson')
    console.log(person, 'updatePerson')
    const res = await axios.put(`${BASE_URL}/update/${id}`, person);
    return res;
  } catch (e) {
    if (e.response)
      console.log(e)
  }
};

export default { getPersons, addPerson, deletePerson, updatePerson };
