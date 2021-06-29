import React from 'react';
import ShowUserComponent from '../components/show-user/ShowUser.component';



const ShowUser = props => {
    return (
        <React.Fragment>
            <ShowUserComponent {...props}/>
        </React.Fragment>
    )
}


export default ShowUser;