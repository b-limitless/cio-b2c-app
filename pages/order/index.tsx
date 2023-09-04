import Header from 'components/Header/Header';
import { measurementNavigation } from 'config/product';
import { OrderProcessType } from 'pages/customize/enums';
import { useState } from 'react';
import Measurement from './Measurement';
export default function Order() {
    const [measurementJourney, setMeasurementJourney] = useState<OrderProcessType>('measurement');
    return (
        <>
            <Header navigations={measurementNavigation} designJourney={measurementJourney} setDesignJourney={setMeasurementJourney} showNavigation />
            <Measurement/>
        </>
    )
}
