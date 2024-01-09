/**
 * This component will basically take the information which is store in the redux store
 * along with different infomration such as carts items, user authenticated token
 * For now we do not have authenticated system for this app since we are under process of developing
 * This component is classified in different parts
 * 
 * 1. Measurement
 * 2. Shipping
 * 3. Payment Options 
 * 4. Order completed
 * 
 * 1. Measurement
 *    Will colleted the information about the user measurement check the interface
 * 2. Shipping
 *    Will contain information about the shipping details and billing information
 * 3. Payment
 *    Payment options we are integration for now paypal because intially it is avaialable in wide range of country
 *    Creadit cart payment system would need to discuss more further
 * 4. Finally order completed screen
 * 
 * State Management
 * Using local state management in this component because we are not using this information in any other router except this
 * Perhaps this is the last component in this user purchasing journey therefore we already have other information from cart, customized route
 * Which is stored in redux store and we can access then in this component if needed
 * **/
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { updateMeasurementAction } from 'slices/measurmentSlice';

export default function Order() {
    const [measurementJourney, setMeasurementJourney] = useState<combinedTypes>('measurement');
    const measurement = useSelector((state:RootState) => state.measurment);
    const dispatch = useDispatch();

    const nextStageHandler = () => {
        nextStage(OrderProcess, measurementJourney, setMeasurementJourney);
    }

    const measurementOnChangeHandler = (e:any) => {
        const {key, value} = e;
        dispatch(updateMeasurementAction({key, value}))
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
                    nextStageHandler={nextStageHandler} 
                    onChangeHandler={measurementOnChangeHandler}
                    
                    />}
            {measurementJourney === OrderProcess.shipping && <Shipping measurementJourney={measurementJourney} setMeasurementJourney={setMeasurementJourney} nextStageHandler={nextStageHandler}/>}
            {measurementJourney === OrderProcess.payment_options && <Payment measurementJourney={measurementJourney} setMeasurementJourney={setMeasurementJourney} nextStageHandler={nextStageHandler}/>}
            {measurementJourney === OrderProcess.order_completed && <OrderCompleted measurementJourney={measurementJourney} setMeasurementJourney={setMeasurementJourney} nextStageHandler={nextStageHandler}/>}

        </>
    )
}
