import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import env from "../../config/env.json"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, f_name) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        f_name: f_name
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('f_name');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password) => {
    return dispatch => {
        console.log(email, password)
        dispatch(authStart());

        // let url = 'http://localhost:3001/applicant/applicants/login';
        // var axios = require('axios');
        // var data = JSON.stringify({
        //     "email": email,
        //     "password":password });
        //
        // var config = {
        //     method: 'post',
        //     url: url,
        //     headers: {
        //         'Content-Type': 'application/json',
        //
        //     },
        //     body: data
        //
        // };
        // axios(config)
        axios({
            method: 'post',
            url: env.baseUrl+'/applicant/applicants/login',
            data: {
                email: email.toString(),
                password: password.toString()
            }
        })
            .then(response => {
                // console.log(response.data.data.token)
                console.log('resoponse recieved');

                var decoded = jwt_decode(response.data.data.token);

                const expirationDate = new Date(new Date().getTime() + (3600 * 2 * 1000));
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', new Date(decoded.exp * 1000));
                localStorage.setItem('userId', decoded.id);
                localStorage.setItem('f_name', decoded.f_name);
                dispatch(authSuccess(response.data.token, decoded.id, decoded.f_name));
                dispatch(checkAuthTimeout(3600 * 2));
                console.log(response)
            })
            .catch(function (error) {
                var str = error.toString();
                var res = str.replace(/\D/g, "");
                if (res === '400') {
                    alert('The password that entered is incorrect.');
                } else if (res === '401') {
                    alert('Please Confirm your email')
                } else if (res === '404') {
                    alert('The email address you entered is not connected to an account. Please Register!')
                }else {
                    alert('Either of username or password is incorrect')
                }

                // alert(error);
                dispatch(authFail(error));
            });


    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const f_name = localStorage.getItem('f_name');
                dispatch(authSuccess(token, userId, f_name));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};




