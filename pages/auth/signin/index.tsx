import React from 'react';
import Main from './Main';
import { storeID } from 'config/user';

export default function index() {

    return (
        <Main userId={storeID} />
    )
}
