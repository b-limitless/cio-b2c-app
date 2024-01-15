/**
 * This component will basically take the information which is store in the redux store
 * along with different infomration such as carts items, userAndShirtMeasurement authenticated token
 * For now we do not have authenticated system for this app since we are under process of developing
 * This component is classified in different parts
 * 
 * 1. Measurement
 * 2. Shipping
 * 3. Payment Options 
 * 4. Order completed
 * 
 * 1. Measurement
 *    Will colleted the information about the userAndShirtMeasurement measurement check the interface
 * 2. Shipping
 *    Will contain information about the shipping details and billing information
 * 3. Payment
 *    Payment options we are integration for now paypal because intially it is avaialable in wide range of country
 *    Creadit cart payment system would need to discuss more further
 * 4. Finally order completed screen
 * 
 * State Management
 * Using local state management in this component because we are not using this information in any other router except this
 * Perhaps this is the last component in this userAndShirtMeasurement purchasing journey therefore we already have other information from cart, customized route
 * Which is stored in redux store and we can access then in this component if needed
 * **/
import Header from 'components/Header/Header';
import { measurementNavigation } from 'config/product';
import { OrderProcessType, OrderProcess, SelectionProcess, combinedTypes } from 'types/enums';
import { useEffect, useState } from 'react';
import Measurement from './Measurement';
import Shipping from './Shipping';
import Payment from './Payment';
import OrderCompleted from './Completed';
import { nextStage } from 'functions/nextStage';
import { SelectionTypes } from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { updateErrors, updateMeasurementAction, updateMeasurementErrorAction } from 'slices/measurmentSlice';
import { IMeasurementBase } from 'interface/IMeasurementBase';
import { camelCaseToNormal } from 'functions/camelCaseToNormal';
import { IPantMeasurement } from 'interface/IPantMeasurement';
import { IShirtMeasurement } from 'interface/IShirtMeasurement';
import { isThereAnyError } from 'functions/isThereAnyError';
import { userAndShirtMeasurement } from 'model/user';
import { IShipping, updateShippingAction, updateShippingErrorAction } from 'slices/shippingSlice';
import { ShippingModel } from 'model/shipping';

export default function Order() {
    const [measurementJourney, setMeasurementJourney] = useState<combinedTypes>('shipping');
    const measurement = useSelector((state: RootState) => state.measurment);
    const shipping = useSelector((state: RootState) => state.shipping);
    // const shipping = useSelector((state: RootState) => state.);
    const { errors:errorsMeasurement } = measurement;
    const [shouldMoveToNextStep, setShouldMoveToNextStep] = useState<boolean>(false);
    const dispatch = useDispatch();

    const nextStageHandler = () => {

        // Need to validate the form if all of them are filled then only move to the next step
        if (measurementJourney === 'measurement') {
            // Make sure that the form is filled
            const measurementError: any = {};

            for (const field of Object.keys(userAndShirtMeasurement) as Array<keyof (IShirtMeasurement | IPantMeasurement)>) {
                if (measurement.data.unite === 'cm' && field === 'inch') continue;
                // @ts-ignore
                if (!userAndShirtMeasurement[field].test(measurement.data[field])) {
                    measurementError[field] = `${camelCaseToNormal(field)} is required`
                } else {
                    measurementError[field] = null;
                }

            }
            dispatch(updateErrors(measurementError));
            setShouldMoveToNextStep(true);

        }
    }

    const measurementOnChangeHandler = (e: any) => {
        const { name, value } = e.target;
        console.log('name,value', name, value);
        dispatch(updateMeasurementAction({ key: name, value }))

    }

    const onMouseLeaveEventHandlerMeasurement = (name: keyof IMeasurementBase, value: string) => {
        if (!userAndShirtMeasurement[name]?.test(value)) {
            dispatch(updateMeasurementErrorAction({ key: name, value: `${camelCaseToNormal(name, true)} is required` }));
        } else {
            dispatch(updateMeasurementErrorAction({ key: name, value: null }));
        }
    }

    const onMouseLeaveEventHandlerShipping = (name: keyof IShipping, value: string) => {
        if (!ShippingModel[name]?.test(value)) {
            dispatch(updateShippingErrorAction({ key: name, value: `${camelCaseToNormal(name, true)} is required` }));
        } else {
            dispatch(updateShippingErrorAction({ key: name, value: null }));
        }
    }

    const onChangeHandlerShipping = (e:any) => {
        const { name, value } = e.target;
        dispatch(updateShippingAction({ key: name, value }))
    }
    

    useEffect(() => {
        if (!isThereAnyError(errorsMeasurement) && shouldMoveToNextStep) {
            // Get the next step to move on
            nextStage(OrderProcess, measurementJourney, setMeasurementJourney);
            setShouldMoveToNextStep(false);
        }
    }, [shouldMoveToNextStep, errorsMeasurement, measurementJourney]);


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
                    onMouseLeaveEventHandler={onMouseLeaveEventHandlerMeasurement}

                />}
            {measurementJourney === OrderProcess.shipping && 
             <Shipping 
             measurementJourney={measurementJourney} 
             setMeasurementJourney={setMeasurementJourney} 
             nextStageHandler={nextStageHandler} 
             shipping={shipping}
             onMouseLeaveEventHandler={onMouseLeaveEventHandlerShipping}
             onChangeHandler={onChangeHandlerShipping}
             
             />}
            {measurementJourney === OrderProcess.payment_options && <Payment measurementJourney={measurementJourney} setMeasurementJourney={setMeasurementJourney} nextStageHandler={nextStageHandler} />}
            {measurementJourney === OrderProcess.order_completed && <OrderCompleted measurementJourney={measurementJourney} setMeasurementJourney={setMeasurementJourney} nextStageHandler={nextStageHandler} />}

        </>
    )
}
