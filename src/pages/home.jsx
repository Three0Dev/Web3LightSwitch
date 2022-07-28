import React from 'react';
import {logout, getAccountId} from 'three0-js-sdk/auth'
import {getDocStore} from 'three0-js-sdk/database'
import env from '../env'
import init from 'three0-js-sdk';
// import * as Three0 from 'three0-js-sdk'

export const Home = () => {
    return (
        <div className={isLightOn() ? 'light-on' : 'light-off'}>
            <h1>Home</h1>
            <button onClick={lightSwitch}>{`Turn light ${isLightOn() ? 'off' : 'on'}`}</button>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
}

function lightSwitch() {
    //basic access controller
    if(getAccountId() == 'vlasp.testnet') {

    }
}

function isLightOn() {
    getDocStore('/orbitdb/zdpuAxpWvkGQtpEpn8a7TUYBR5KS8P6BBnMPQPcuzhA7hqvcC/light_log').then((db) => {
        console.log(db)
    });

    //schema for database:
    // {name: getAccountId(), light: 'on'}
    return false;
}
