const Header = ({course}) => {
  return (<h1>{course.name}</h1>)
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content content={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
