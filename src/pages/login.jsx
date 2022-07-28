import React from 'react';
import {login} from 'three0-js-sdk/auth'

export const Login = () => {
    return (
        <div>
        <h1>Login</h1>
        <button onClick={() => login()}>Login</button>
        </div>
    );
}
