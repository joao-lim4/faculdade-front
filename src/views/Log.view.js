import React from 'react';
import LogsComponent from '../components/Logs/Log.component';


const LogsView = props => {
    return (
        <React.Fragment>
            <LogsComponent {...props}/>
        </React.Fragment>
    )
}


export default LogsView;