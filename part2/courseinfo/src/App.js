import {useState} from "react";
import Course from "./components/Course";
const App = (props) => {
  const [notes, setNotes] = useState(props?.notes)
  const [newNote, setNewNote] = useState('a new note...')
    const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const addNote = (e)=> {
    e.preventDefault()
    console.log('Button clicked', e.target)
  }

  const handleNewNote = (e) => {
    setNewNote(e.target.value)
  }



  return (
      <>
        <Course courses={courses}/>
        <form onSubmit={addNote} >
          <input value={newNote} onChange={handleNewNote}/>
          <button type="submit">save</button>
        </form>
      </>
  )
}

export default App
