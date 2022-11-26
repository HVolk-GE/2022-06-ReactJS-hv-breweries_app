import React from 'react';
import { useDispatch } from 'react-redux';
import '../index.css'

const Logout = () => {

    const dispatch = useDispatch()

    dispatch({
        type: 'LOGOUT'
    })

    return (
        <div className='sideStandardMargin'>
            <h2>You have been logged out. YET</h2>
        </div>
    )
}

export default Logout