import axios from "axios";

const BASE_URL = 'http://localhost:3001/api/persons'

const getPersons = async () => {
  try {
    const res = await axios.get(BASE_URL)
    return res
  } catch (e) {
    if (e.response) console.log(`There has been an error getting ${e.response.data}`)
  }
}

const addPerson = async (newPerson) => {
  try {
    const res = await axios.post(BASE_URL, newPerson)
    return res
  } catch (e) {
    if (e.response) console.log(`There has been an error adding ${e.response.data}`)
  }
}

const deletePerson = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/delete/${id}`)
    return res
  } catch (e) {
    if (e.response) console.log(`There has been an error deleting ${e.response.data}`)
  }
}

const updatePerson = async (person, id) => {
  try {
    const res = await axios.put(`http://localhost:3001/persons/${id}`, person)
    return res
  } catch (e) {
    if (e.response) console.log(`There has been an error updating ${e.response.data}`)
  }
}

export default { getPersons, addPerson, deletePerson , updatePerson}
