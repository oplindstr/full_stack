import React from 'react';

const Person = ({person, deletePerson}) => {
    return (
      <li>{person.name} {person.phonenumber} <button onClick={deletePerson}>Poista</button></li>
    )
  }

  export default Person