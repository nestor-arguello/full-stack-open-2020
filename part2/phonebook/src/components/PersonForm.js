import React from 'react';

const PersonForm = ({ newPerson, handleChange, handleClick }) => (
  <form>
    <div>
      name: <input name="name" onChange={handleChange} value={newPerson.name} />
    </div>
    <div>
      number:{' '}
      <input name="number" onChange={handleChange} value={newPerson.number} />
    </div>
    <div>
      <button type="submit" onClick={handleClick}>
        add
      </button>
    </div>
  </form>
);

export default PersonForm;
