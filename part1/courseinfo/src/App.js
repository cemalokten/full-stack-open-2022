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

const Total = ({total}) => {
  return (
    <p>Number of exercises {total.reduce((acc, c) => acc + c)}</p>
  )
}

const App = () => {
 const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content content={[part1, part2, part3]}/>
      <Total total={[part1.exercises, part2.exercises, part3.exercises]}/>
    </div>
  )
}

export default App
