import React, { Component } from 'react';
import classes from  './App.module.css';
import Person from '../components/Persons/Person/Person';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

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
      cursor: 'pointer'
    }
    
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
              <div>
                {this.state.persons.map((person, index) => {
                  return <ErrorBoundary key={person.id}>
                    <Person 
                      click={() => this.deletePersonHandler(index)}
                      name={person.name}
                      age={person.age} 
                      changed={(event) => this.nameChangedHandler(event, person.id)} />
                  </ErrorBoundary>
                })}
            </div>
      );
      style.backgroundColor = 'red'
      btnClass = classes.Red;
    }

    const cssClasses = [];
    if (this.state.persons.length <= 2) {
      cssClasses.push( classes.red );
    }
    if (this.state.persons.length <= 1) {
      cssClasses.push( classes.bold )
    }

    console.log(classes)
    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={cssClasses.join(' ')} >This is really working!</p>
        <button className={btnClass} onClick={this.togglePersonsHandler}>toggle person</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;