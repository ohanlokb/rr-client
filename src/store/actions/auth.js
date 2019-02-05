import axios from '../../axios-auth';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        email: email
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (exprationTime) => {
    return dispatch => {
        setTimeout( ()=> {
            dispatch(logout());
        }, exprationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        const key='AIzaSyBOKYKw15XMYjTxN8AhMY4KxkwvV3ahQK4';
        let url = `/signupNewUser?key=${key}`;
        if ( !isSignUp ) {
            url = `/verifyPassword?key=${key}`;
        }
        axios.post(url, authData)
        .then( response => {
            const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
            localStorage.setItem('email',email);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('userId',response.data.localId);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(response.data.idToken, response.data.localId, email));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch( error => {
            dispatch(authFail(error.response.data.error));
        });
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch( logout() );            
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= Date() ) {
                dispatch( logout() );
            } else {
                const userId = localStorage.getItem('userId');
                const email = localStorage.getItem('email');
                dispatch( authSuccess(token,userId, email) );
                dispatch( checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ) );
            }
        }        
    };
};