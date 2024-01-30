import { storeID } from 'config/user'
import CustomizeMain from './CustomizeMain'

export default function CustomizeRouteBaseUserId() {
    // Normally we will fetch the redux store because in MainLayout file
    // We need to dispatch the user id manuall for the files
    return (
        <CustomizeMain userId={storeID} />
    )
}
