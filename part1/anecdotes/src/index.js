import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ text }) => <p>{text}</p>;

const Header = ({ text }) => <h1>{text}</h1>;

const VotesCounter = ({ votes }) => <p>has {votes} votes</p>;

const getRandomIndex = (prevIndex, maxIndex) => {
  const newIndex = Math.floor(Math.random() * maxIndex);

  if (newIndex !== prevIndex) {
    return newIndex;
  }

  return getRandomIndex(newIndex, maxIndex);

};

const higherIndexIn = array => array.indexOf(Math.max(...array));

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [anecdotesVotes, setAnecdotesVotes] = useState(
    Array.from({ length: anecdotes.length }).fill(0)
  );

  const mostVotedIndex = higherIndexIn(anecdotesVotes);

  const getRandomAnecdote = () => {
    const newSelectedIndex = getRandomIndex(selected, anecdotes.length);
    setSelected(newSelectedIndex);
  };

  const addVote = () => {
    const anecdotesVotesCopy = [...anecdotesVotes];
    anecdotesVotesCopy[selected] += 1;
    setAnecdotesVotes(anecdotesVotesCopy);
  };

  return (
    <div>
      <Header text={'Anecdote of the day'} />
      <Anecdote text={anecdotes[selected]} />
      <VotesCounter votes={anecdotesVotes[selected]} />
      <Button text={'vote'} handleClick={addVote} />
      <Button text={'next anecdote'} handleClick={getRandomAnecdote} />
      {anecdotesVotes[mostVotedIndex] > 0 && (
        <div>
          <Header text={'Anecdote with most votes'} />
          <Anecdote text={anecdotes[mostVotedIndex]} />
          <VotesCounter votes={anecdotesVotes[mostVotedIndex]} />
        </div>
      )}
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
