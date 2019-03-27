import React, { PureComponent } from 'react'
import Person from './Person/Person'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'


/****
* PureComponent
*  automaticlly setup shouldComponentUpdate to compare all the
*  props ie nextProps.x !== this.props.x ....
*
*  where as Component
*  you will need to specifiy in shouldComponentUpdate like below
*/


class Persons extends PureComponent {

  // 1st
  //static getDerivedStateFromProps(props, state)
  //{
  //  console.log(['Person.js getDerivedStateFromProps'])
  //  return state
  //}

  //2nd
  //shouldComponentUpdate(nextProps, nextState)
  //{
  //  console.log('Person.js shouldComponentUpdate')
  //  if (nextProps.persons !== this.props.persons ||
  //       nextProps.changed !== this.props.changed ||
  //       nextProps.clicked !== this.props.clicked ) return true

  //  return false
  //}

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