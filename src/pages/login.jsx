import React from 'react';
import { Auth } from '@three0dev/js-sdk';

export const Login = () => {
    return (
        <div>
        <h1>Login</h1>
        <button onClick={() => Auth.loginWithWallet()}>Login</button>
        </div>
    );
}
