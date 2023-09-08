import Header from 'components/Header/Header';
import { measurementNavigation } from 'config/product';
import { OrderProcessType, OrderProcess, SelectionProcess, combinedTypes } from 'types/enums';
import { useState } from 'react';
import Measurement from './Measurement';
import Shipping from './Shipping';
import Payment from './Payment';
import OrderCompleted from './Completed';
import { nextStage } from 'functions/nextStage';
import { SelectionTypes } from 'types/enums';
export default function Order() {
    const [measurementJourney, setMeasurementJourney] = useState<combinedTypes>('measurement');

    const nextStageHandler = () => {
        
        nextStage(OrderProcess, measurementJourney, setMeasurementJourney);
    }
    return (
        <>
            <Header navigations={measurementNavigation}
                designJourney={measurementJourney}
                setDesignJourney={setMeasurementJourney}
                showNavigation />
            {measurementJourney === OrderProcess.measurement &&
                <Measurement
                    measurementJourney={measurementJourney}
                    setMeasurementJourney={setMeasurementJourney}
                    nextStageHandler={nextStageHandler} />}
            {measurementJourney === OrderProcess.shipping && <Shipping measurementJourney={measurementJourney} setMeasurementJourney={setMeasurementJourney} nextStageHandler={nextStageHandler}/>}
            {measurementJourney === OrderProcess.payment_options && <Payment measurementJourney={measurementJourney} setMeasurementJourney={setMeasurementJourney} nextStageHandler={nextStageHandler}/>}
            {measurementJourney === OrderProcess.order_completed && <OrderCompleted measurementJourney={measurementJourney} setMeasurementJourney={setMeasurementJourney} nextStageHandler={nextStageHandler}/>}


        </>
    )
}
