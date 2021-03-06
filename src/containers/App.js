

import React, { Component } from 'react';
import classes from  './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass'
import Aux from '../hoc/Auxiliary'
import AuthContext from '../context/auth-context'

class App extends Component {

  state = {
    persons: [
      { id: '123456A', name: 'Max', age: 28 },
      { id: '123456B', name: 'Manu', age: 29 },
      { id: '123456C', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  // this gets called first
  constructor(props) {
    super(props)
    console.log('[app.js] constructor')
  }

  // this gets called second
  static getDerivedStateFromProps(props, state) {
    console.log('[app.js] getDerivedStateFromProps')
    console.log(props)
    return state
  }


  //this gets called before componentDidMount only supported on older version
  //componentWillMount() {
  //  console.log('[app.js] componentWillMount')
 // }

  //this gets called last
  componentDidMount() {
    console.log('[app.js] componentDidMount')
  }

  componentDidUpdate() {
    console.log('[app.js] componentDidUpdate')

  }

  shouldComponentUpdate(nextProps, nextState)
  {
    console.log('[app.js] shouldComponentUpdate')
    return true;

  }

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

    // if you want to update a state from the current state need to use a function 

    this.setState((prevState, props) =>
    {
      return { 
        persons, 
        changeCounter: prevState.changeCounter + 1
      }
    });
  }

  deletePersonHandler = (personIndex) =>
  {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1)
    this.setState({persons})
  }

  loginHandler = () =>
  {
    this.setState({authenticated: true })
  }

  /*
    NOTE:
    that if onClick={this.togglePersonsHandler("somevar")} the function get called instantly
    so you need to use
    onClick={() => this.togglePersonsHandler("somevar")} this will call the function correctly once clicked
    to call function that takes no values use:
    <button style={style} onClick={this.togglePersonsHandler}>Switch Name</button>
    */

  // then render gets called
  // then the children in the render get called
  render() {
    console.log('[App.js] render')
    let persons = null;

    if (this.state.showPersons) {

      persons = <Persons 
                  persons={this.state.persons}
                  clicked={this.deletePersonHandler}
                  changed={this.nameChangedHandler}
                  isAuthenticated={this.state.authenticated}/>

    }

    return (
      <Aux>
      <button onClick={() => {
        this.setState({ showCockpit: false})
      }}>remove cockpit</button>
      <AuthContext.Provider 
         value=
         {
           {
              authenticated: this.state.authenticated,
              login: this.loginHandler
           }
        }>
        {this.state.showCockpit ? <Cockpit 
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
        /> : null}
        {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);