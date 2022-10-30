const Header = ({course}) => {
  return (<h1>{course}</h1>)
}

const Content = ({content})=> {
  return content.map(v => {
    return <p>{`${v[0]} ${v[1]}`}</p>
  })
}

const Total = ({total}) => {
  return (
    <p>Number of exercises {total.reduce((acc, c) => acc + c)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content content={[[part1, exercises1], [part2, exercises2], [part3, exercises3]]}/>
      <Total total={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App
