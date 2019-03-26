import React, { Component } from 'react';
import './App.module.css';
import Radium, { StyleRoot } from 'radium'
import Person from '../components/Persons/Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: '123456A', name: 'Max', age: 28 },
      { id: '123456B', name: 'Manu', age: 29 },
      { id: '123456C', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  switchNameHandler = (NewName = 'dave') => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: NewName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };


  togglePersonsHandler = () =>
  {
    const currentShow = this.state.showPersons
    this.setState({showPersons: !currentShow})
  }

  nameChangedHandler = (event, id) =>
  {
    
    const personIndex = this.state.persons.findIndex((person) => {
      return person.id === id
    })

    const person = {...this.state.persons[personIndex]}

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person;

    this.setState({ persons });
  }

  deletePersonHandler = (personIndex) =>
  {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1)
    this.setState({persons})
  }

  /*
    NOTE:
    that if onClick={this.togglePersonsHandler("somevar")} the function get called instantly
    so you need to use
    onClick={() => this.togglePersonsHandler("somevar")} this will call the function correctly once clicked
    to call function that takes no values use:
    <button style={style} onClick={this.togglePersonsHandler}>Switch Name</button>
    */

  render() {
    // inline styling example
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }
    
    let persons = null;

    if (this.state.showPersons) {
      persons = (
              <div>
                {this.state.persons.map((person, index) => {
                  return <Person 
                  click={() => this.deletePersonHandler(index)}
                  name={person.name}
                  age={person.age}
                  key={person.id} 
                  changed={(event) => this.nameChangedHandler(event, person.id)} />
                })}
            </div>
      );
      style.backgroundColor = 'red'
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    let cssclasses = [];
    if (this.state.persons.length <= 2) {
      cssclasses.push('red');
    }
    if (this.state.persons.length <= 1) {
      cssclasses.push('bold')
    }


    return (
     <StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={cssclasses.join(' ')} >This is really working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>toggle person</button>
        {persons}
      </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);