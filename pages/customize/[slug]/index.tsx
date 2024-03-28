// Normally we will fetch the redux store because in MainLayout file
// We need to dispatch the user id manuall for the files
import React, { Suspense } from 'react';
import { storeID } from 'config/user'
import Loader from 'components/Loader';

const CustomizeMain = React.lazy(() => import('./CustomizeMain'));

export default function CustomizeRouteBaseUserId() {
    return (
        <Suspense fallback={<Loader/>}>
             <CustomizeMain userId={storeID} />
        </Suspense>
       
    )
}
