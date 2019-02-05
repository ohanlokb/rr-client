import React from 'react';
import {Link} from 'react-router-dom';

import Auth from './Auth';

const Header = (props) => {

    let authLinks = null;
    if(props.isAuthenticated) {
        authLinks = (
            <div className="right menu">
                <Link className="item" to="/streams/new">Create</Link>
                <Link className="item" to="/streams/show">Show</Link>
                <Link className="item" to="/streams/edit">Edit</Link>
                <Link className="item" to="/streams/delete">Delete</Link>

                <Auth className="item" />
            </div>
        );
    } else {
        authLinks = (
            <div className="right menu">
                <Auth className="item" />
            </div>
        );
    }

    return (
        <div className="ui secondary pointing menu">
            <Link className="item" to="/">All Streams</Link>
            {authLinks}
        </div>
    );
};


export default Header;