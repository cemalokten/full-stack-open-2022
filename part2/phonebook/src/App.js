import { useState, useEffect } from 'react'
import AllPeople from "./Components/AllPeople";
import NewPerson from "./Components/NewPerson";
import Search from "./Components/Search";
import Services from './services/'

const App = () => {
  const [allPersons, setAllPersons] = useState([])
  const [person, setPerson] = useState({ name: '', number: '' })
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getPersons = async () => {
      try {
        const { data, error } = await Services.getPersons();
        setAllPersons(data)
        if (error) {
          throw new Error(error);
        }
      } catch (error) {
        console.error(error)
      }
    }
    getPersons()
  }, [newPerson])

  const addPerson = async () => {
    try {
      const { data, error } = await Services.addPerson(person);
      if (error) {
        throw new Error(error);
      }
      setNewPerson({ data })
    } catch (error) {
      console.error(error)
    }
  }

  const deletePerson = async (id) => {
    try {
      const { data, error } = await Services.deletePerson(id);
      if (error) {
        throw new Error(error);
      }
      setNewPerson({ data })
    } catch (error) {
      console.error(error)
    }
  }

  const updatePerson = async (person, id) => {
    try {
      const { data, error } = await Services.updatePerson(person, id);
      setNewPerson({ data })
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDuplicate =  (person) => {
     return allPersons.some(({ name }) => {
      return name === person.name
    });
  }

  const getUserByName = (person) => {
    return allPersons.filter((c) => c.name === person.name)[0]
  }

  const filteredPersons = allPersons?.filter(({ name }) => {
    return name.toLowerCase().includes(search.toLowerCase())
  })


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleDuplicate(person)) {
      if (window.confirm('The user already exists, update the phone number?')) {
        const { id }= getUserByName(person)
        return updatePerson(person, id)
      }
    } else {
      await addPerson(person)
    }}


  const handleNewName = (e) => {
    setPerson({ ...person, name: e.target.value })
  }

  const handleNewNumber = (e) => {
    setPerson({ ...person, number: e.target.value })
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this entry?')) return deletePerson(id)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Search handleSearch={handleSearch} search={search} />
        <NewPerson handleNewName={handleNewName} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit} newPerson={person} />
      </form>
      <AllPeople filterdPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App