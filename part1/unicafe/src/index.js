import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Interactions = ({ feedback }) => {
  const { good, neutral, bad } = feedback;

  return (
    <div>
      <Button text={good.text} handleClick={good.handleClick} />
      <Button text={neutral.text} handleClick={neutral.handleClick} />
      <Button text={bad.text} handleClick={bad.handleClick} />
    </div>
  );
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const totalFeedback = good.stat + neutral.stat + bad.stat;
  const average = (good.stat - bad.stat) / totalFeedback;
  const goodPercent = (good.stat * 100) / totalFeedback;

  return (
    <table>
      <tbody>
        <Statistic text={good.text} value={good.stat} />
        <Statistic text={neutral.text} value={neutral.stat} />
        <Statistic text={bad.text} value={bad.stat} />
        <Statistic text="total" value={totalFeedback} />
        <Statistic text="average" value={average.toFixed(1)} />
        <Statistic text="positive" value={goodPercent.toFixed(1) + ' %'} />
      </tbody>
    </table>
  );
};

const addStat = prevStat => prevStat + 1;

const App = () => {
  const [goodStat, setGoodStat] = useState(0);
  const [neutralStat, setNeutralStat] = useState(0);
  const [badStat, setBadStat] = useState(0);

  const feedback = {
    good: {
      text: 'good',
      stat: goodStat,
      handleClick: () => setGoodStat(addStat),
    },
    neutral: {
      text: 'neutral',
      stat: neutralStat,
      handleClick: () => setNeutralStat(addStat),
    },
    bad: {
      text: 'bad',
      stat: badStat,
      handleClick: () => setBadStat(addStat),
    },
  };

  const { good, neutral, bad } = feedback;
  const totalStats = good.stat + neutral.stat + bad.stat;
  const statisticsComponent = totalStats ? (
    <Statistics feedback={feedback} />
  ) : (
    <p>No feedback given</p>
  );

  return (
    <div>
      <Header title={'give feedback'} />
      <Interactions feedback={feedback} />
      <Header title="statistics" />
      {statisticsComponent}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
