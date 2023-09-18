import React from 'react'
import { NavLink } from 'react-router-dom'
import ZeldaSound from './ZeldaSound.mp3'

const HeaderComponent = () => {

    function play() {
        new Audio(ZeldaSound).play()
        //This is the function you make for the audio to play
    }
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <a className="navbar-brand" href="http://www.employeedirect.net">Emplpyee Manageent System</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/employees' onClick={play} >Employees</NavLink>
                            {/* Creates a navigation link in the navbar to the employees page that is already tied the employees componenet in apps.jsx */}
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/departments' onClick={play} >Departments</NavLink>
                            {/* Creates a navigation link in the navbar to the Department page that is already tied the ListDepartment componenet in apps.jsx */}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default HeaderComponent