const Header = ({course}) => {
  return (<h1>{course}</h1>)
}

const Part = ({part, exercise}) => {
  return <p>{part} {exercise}</p>
}

const Content = ({content})=> {
  return content.map(({name, exercises}) => {
    return <Part part={name} exercise={exercises}/>
  })
}

const Total = ({parts}) => {
  return (<p>Number of exercises {parts.reduce((acc, c) => acc + c.exercises, 0)}</p>)
}

const App = () => {
 const course = 'Half Stack application development'
  const parts = [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content content={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App
