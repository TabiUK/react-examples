import React, { useEffect, useRef, useContext } from 'react';
import classes from  './Cockpit.module.css'
import AuthContext from '../../context/auth-context'

const cockpit = (props) => {

    const toggleBtnRef = useRef(null)

    const authContext = useContext(AuthContext)
    console.log(authContext.authenticated)

    useEffect(() => {
        console.log('[cockpit.js] useEffect')
        const timer = setTimeout(() => {
            //alert('save data to cloud!')
            toggleBtnRef.current.click()
        }, 1000)
        return () => {
            clearTimeout(timer)
            console.log('[cockpit.js] cleanup work in useEffect')
        }
    }, [])

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useeffect')
        return () => {
            console.log('[cockpit.js] 2nd cleanup work in useEffect')
        }
    })

    const cssClasses = [];
    let btnClass = '';

    if (props.showPersons) {
      btnClass = classes.Red;
    }

    if (props.personsLength <= 2) {
      cssClasses.push( classes.red );
    }
    if (props.personsLength <= 1) {
      cssClasses.push( classes.bold )
    }

    return (
        <div className={classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={cssClasses.join(' ')} >This is really working!</p>
        <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>toggle person</button>
        <button onClick={authContext.login}>Log in</button>
        </div>
    )
}

export default React.memo(cockpit);