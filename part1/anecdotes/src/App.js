import { useState } from 'react'

const Anecdote = ({children}) => {
  return <div>{children}</div>
}

const generateRandomAnecdote = (setState, arr) => {
    setState(Math.floor(Math.random() * (arr.length-1 - 0) + 0))
}

const Button = ({handleClick, children}) => {
  return <button onClick={handleClick}>{children}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0})

    const updateVotes = (index) => {
        const newVotes = { ...votes, [index]: votes[index] + 1}
        setVotes(newVotes)
    }
    const getAnecdoteWithMostVotes = () => {
       const highestVote = Math.max(...Object.values(votes))
       return Object.keys(votes).filter((key)=> votes[key] === highestVote )
    }

    const mostVoteIndex = getAnecdoteWithMostVotes()

  return (
    <div>
        <h1>Anecdote of the day</h1>
      <Anecdote>
      {anecdotes[selected]}
      </Anecdote>
      <Button handleClick={()=>updateVotes(selected)}>vote</Button>
      <Button handleClick={() => generateRandomAnecdote(setSelected, anecdotes)}>Next anecdote</Button>
        <h1>Anecdote with most votes</h1>
        <Anecdote>
            {anecdotes[mostVoteIndex[0]]}
        </Anecdote>
    </div>
  )
}

export default App
