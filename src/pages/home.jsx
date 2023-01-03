import React, {useEffect} from 'react';
import { Auth, Database } from '@three0dev/js-sdk';
import env from '../env'

export const Home = () => {
    const [database, setDatabase] = React.useState(null);
    const [lightStatus, setLightStatus] = React.useState(false);

    useEffect(() => {
        Database.DocStore(env.lightSwitchLogDB).then(db => {
            setDatabase(db);
            db.onChange(() => {
                getLightStatus(db).then(status => {setLightStatus(status)})}
            );
            getLightStatus(db).then(status => {setLightStatus(status)});
        })
    }, []);

    return (
        <div className={lightStatus ? 'light-on' : 'light-off'}>
            <h1>Home</h1>
            <button onClick={() => lightSwitch(database, lightStatus, setLightStatus)}>{`Turn light ${lightStatus ? 'off' : 'on'}`}</button>
            <button onClick={() => Auth.logout()}>Logout</button>
        </div>
    );
}

function lightSwitch(database, lightStatus, setLightStatus) {
    setLightStatus(!lightStatus);
    getLightStatus(database).then(light => {
        // console.log(light);
        const time = Date.now().toString();
        database.set(time, {name: Auth.getAccountId(), light: light ? 'off' : 'on'});
        console.log(`Light switched to ${!lightStatus ? 'on' : 'off'}`);
    });
}

async function getLightStatus(database) {
    const statuses = await database.get('');
    statuses.sort((a,b) => a._id.compareTo(b._id));
    return statuses.length === 0 ? false : (statuses[0].light === 'on');
}
