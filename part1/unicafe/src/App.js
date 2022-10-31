import { useState } from 'react'

const Header1 = ({header})=> { 
  return <h1>{header}</h1>
}

const Header2 = ({header})=> { 
  return <h2>{header}</h2>
}

const Button = ({children, onClick}) => {
  return <button onClick={onClick}>{children}</button>
}

const Statistic = ({title, number, unit}) => {
  return (<tr>
     <td>{title}</td>
     <td>{number ? number : 0}{unit ? unit : ''}</td>
    </tr>)
}
   
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = {
    all: good + neutral + bad,
    average(){ return (good - bad)/this.all },
    positive(){ return (good/this.all)*100 }
  }

  const handleClick = (setState) => {
    return setState(prev => prev+1)
  }

  return (
    <>
      <Header1 header={'give feedback'}/>
      <Button onClick={() => handleClick(setGood)}>good</Button>
      <Button onClick={() => handleClick(setNeutral)}>neutral</Button>
      <Button onClick={() => handleClick(setBad)}>bad</Button>
      <Header2 header={'statistics'}/>
      {good || neutral || bad ?
      <table>
        <tbody>
      <Statistic title={'good'} number={good}/>
      <Statistic title={'neutral'} number={neutral}/>
      <Statistic title={'bad'} number={bad}/>
      <Statistic title={'all'} number={stats.all}/>
      <Statistic title={'average'} number={stats.average()}/>
      <Statistic title={'positive'} number={stats.positive()} unit={'%'}/>
        </tbody>
      </table>
      : 'No feedback given'}
    </>
  )
}

export default App
