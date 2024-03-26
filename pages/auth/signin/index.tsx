import React, { Suspense } from 'react';

import { storeID } from 'config/user';
import Loader from 'components/Loader';

const Main = React.lazy(() => import('./Main'));

export default function index() {

    return (
        <Suspense fallback={<Loader />}>
            <Main userId={storeID} />
        </Suspense>
    )
}
