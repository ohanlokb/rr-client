import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../store/actions';

class Auth extends Component {
    onSignIn = () => {
        this.props.onAuthenticate('test@test.com', 'password', false);
    }

    onSignOut = () => {
        this.props.onLogout();
    }
    
    render() {
        let status = 'Log In';
        if (this.props.isAuthenticated) {
            status = (
                <button className="negative ui button" onClick={this.onSignOut}>
                    Sign Out
                </button>
            );
        } else {
            status = (
                <button className="positive ui button" onClick={this.onSignIn}>
                    Sign In
                </button>
            );
        }
        return (
            <div className="content">{status}</div>
        );
    };
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
} 

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);