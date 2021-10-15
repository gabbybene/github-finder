import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

export const Alert = () => {
    const alertContext = useContext(AlertContext);

    const { alert } = alertContext;

    return (
        alert != null && ( //as long as alert isn't null, show this. so we can dynamically set div class name. 
            <div className={`alert alert-${alert.type}`}> 
                <i className='fas fa-info-circle'></i> {alert.message}
            </div>
        )
    )
}

export default Alert;
