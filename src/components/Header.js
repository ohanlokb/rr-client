import React from 'react';
import {Link} from 'react-router-dom';

import Auth from './Auth';

const Header = (props) => {

    let authLinks = null;
    if(props.isAuthenticated) {
        authLinks = (
            <div className="right menu">
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
            <Link className="item header" to="/">Streams</Link>
            {authLinks}
        </div>
    );
};


export default Header;