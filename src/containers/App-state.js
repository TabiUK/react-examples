import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.module.css';
import Person from '../components/Person/Person'

const app = props => {

  const [ personsStateData, setPersonsStateCallback] = useState({
    persons: [
      { 
        name: 'max',
        age: 28
      },
      {
        name: 'fred',
        age: 77
      },
      {
        name: 'helen',
        age: 5
      }
    ],
    otherState: 'i was here'
  })

  console.log(personsStateData)

  const switchNameHandler = () =>
{
  console.log('was clicked')
  setPersonsStateCallback({ 
    persons: [
      { 
        name: 'max',
        age: 28
      },
      {
        name: 'games',
        age: 770
      },
      {
        name: 'helen',
        age: 5
      }
    ],
    otherState: personsStateData.otherState
  })
}

    return (
      <div className="App">
      <h1>hi im a react app</h1>
      <button onClick={switchNameHandler}>switch name</button>
      <Person name={personsStateData.persons[0].name} age={personsStateData.persons[0].age}/>
      <Person name={personsStateData.persons[1].name} age={personsStateData.persons[1].age}>likes flying</Person>
      <Person name={personsStateData.persons[2].name} age={personsStateData.persons[2].age}/>
      </div>
    )
}


export default app;
