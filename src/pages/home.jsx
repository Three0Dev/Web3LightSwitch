import React, {useEffect} from 'react';
import {logout, getAccountId} from 'three0-js-sdk/auth'
import {getDocStore} from 'three0-js-sdk/database'
import env from '../env'
// import * as Three0 from 'three0-js-sdk'

export const Home = () => {
    const [database, setDatabase] = React.useState(null);
    const [lightStatus, setLightStatus] = React.useState(false);

    useEffect(() => {
        getDocStore(env.lightSwitchLogDB).then(db => {
            setDatabase(db);
            db.onChange(
                () => {getLightStatus(db).then(status => {setLightStatus(status)})}
            );
            getLightStatus(db).then(status => {setLightStatus(status)});
        })
    }, []);

    return (
        <div className={lightStatus ? 'light-on' : 'light-off'}>
            <h1>Home</h1>
            <button onClick={() => lightSwitch(database, lightStatus, setLightStatus)}>{`Turn light ${lightStatus ? 'off' : 'on'}`}</button>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
}

function lightSwitch(database, lightStatus, setLightStatus) {
    setLightStatus(!lightStatus);
    getLightStatus(database).then(light => {
        // console.log(light);
        const time = (new Date()).valueOf().toString();
        if (light) {
            database.set(time, {name: getAccountId(), light: 'off'});
        } else {
            database.set(time, {name: getAccountId(), light: 'on'});
        }
        console.log(`Light switched to ${!lightStatus ? 'on' : 'off'}`);
    });
}

async function getLightStatus(database) {
    const statuses = await database.get('');
    statuses.sort(compare);
    // console.log(statuses)
    const light = statuses[0].light;
    return light==='on';
}

function compare(a, b) {
    if (a._id < b._id) {
        return 1;
    }
    if (a._id > b._id) {
        return -1;
    }
    return 0;
}
