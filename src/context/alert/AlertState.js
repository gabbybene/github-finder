import React, { useReducer } from 'react';
import AlertContext from './alertContext'; 
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (message, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { message, type }
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000); //make it timeout after 5 seconds
    };

    return <AlertContext.Provider 
        value = {{
            //make these available to entire app
            alert: state,
            setAlert
        }}>
        {props.children}
    </AlertContext.Provider>
}

export default AlertState;