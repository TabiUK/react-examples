import React, { Component } from 'react'
import Person from './Person/Person'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

class Persons extends Component {

  // 1st
  //static getDerivedStateFromProps(props, state)
  //{
  //  console.log(['Person.js getDerivedStateFromProps'])
  //  return state
  //}

  //2nd
  shouldComponentUpdate(nextProps, nextState)
  {
    console.log('Person.js shouldComponentUpdate')
    if (nextProps.persons !== this.props.persons) return true

    return false
  }

  //3rd
  getSnapshotBeforeUpdate(prevProps, preState)
  {
    console.log('Person.js getSnapshotBeforeUpdate')
    return { message: 'Snapshot!'}
  }

  // 5th
  componentDidUpdate(prevProps, preState, snapshot)
  {
    console.log('Person.js componentDidUpdate')
    console.log(snapshot)
  }

  componentWillUnmount() 
  {
    console.log('[Persons.js] componentWillUnmount')
  }

  // 4th + child rendering
  render() {
    console.log('[Persons.js] rendering....')
    return this.props.persons.map((person, index) => {
          return <ErrorBoundary key={person.id}>
            <Person 
              click={() => this.props.clicked(index)}
              name={person.name}
              age={person.age} 
              changed={(event) => this.props.changed(event, person.id)} />
          </ErrorBoundary>
        })
      }
}

export default Persons