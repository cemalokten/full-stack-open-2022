import { useState, useEffect } from 'react'
import AllPeople from "./Components/AllPeople";
import NewPerson from "./Components/NewPerson";
import Search from "./Components/Search";
import Notification from "./Components/Notification";
import Services from './services/'

const App = () => {
  const [allPersons, setAllPersons] = useState([])
  const [person, setPerson] = useState({ name: '', number: '' })
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

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
      setNotification({message: `Added ${data.name}`, type: 'notification'})
      setTimeout(()=> setNotification(null), 5000)
    } catch (error) {
      console.error(error)
    }
  }

  const deletePerson = async (id, name) => {
    try {
      const { data, error } = await Services.deletePerson(id);
      console.log(data)
      if (error) {
        throw new Error(error);
      }
      setNewPerson({ data })
      setNotification({message: `The entry for ${name} has been deleted from the server`, type: 'notification'})
    } catch (error) {
      setNotification({message: `The entry for ${name} has already been deleted from the server`, type: 'error'})
      setTimeout(()=> setNotification(null), 5000)
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
    return name ? name.toLowerCase().includes(search.toLowerCase()) : 'n/a'
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

  const handleDelete = (e, id, name) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this entry?')) return deletePerson(id, name)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification}/>
      <form>
        <Search handleSearch={handleSearch} search={search} />
        <NewPerson handleNewName={handleNewName} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit} newPerson={person} />
      </form>
      <AllPeople filterdPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
