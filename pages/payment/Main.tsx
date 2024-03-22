
import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Loader from "components/Loader";
import { APIS } from "config/apis";
import { currency } from "config/paypal";
import { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { addAllItemsToTheCart } from "slices/cartSlice";
import { updateMeasurementToInitialState } from "slices/measurmentSlice";
import { updatePaymentType } from "slices/paymentSlice";
import { updateShippingToInitialState } from "slices/shippingSlice";
import { OrderProcess } from "types/enums";
import { request } from "utils/request";
import { onApprove } from "../../apis/on-approve";
import { createOrder } from "../../apis/create-order";

// This value is from the props in the UI
const style: any = { "layout": "vertical" };

interface IPaypalState {
    clientId: null | string;
    loading: boolean;
    error: null | string;
}
const paypalInitialState: IPaypalState = {
    clientId: null,
    loading: false,
    error: null
}

const FETCHING = 'FETCHING';
const FETCHED = 'FETCHED';
const ERROR = 'ERROR';

function paypalReducer(state: IPaypalState, action: any) {
    switch (action.type) {
        case FETCHING:
            return { ...state, loading: action.payload };
        case FETCHED:
            return { ...state, clientId: action.payload };
        case ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
type TId = string | string[];
// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, id, makeCartEmptyOnApprove }: { showSpinner: boolean, id:TId, makeCartEmptyOnApprove:Function }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={'paypal'}
                createOrder={() => createOrder(id)}
                onApprove={(data:any) => onApprove(data, id, makeCartEmptyOnApprove)}
            />
        </>
    );
}


interface IPayThroughPaypal {
    id: string | string[];
    setMeasurementJourney:Function | undefined;
}
export default function PayThroughPaypal({ id, setMeasurementJourney }: IPayThroughPaypal) {

    const [{ clientId, loading, error }, dispatch] = useReducer(paypalReducer, paypalInitialState);
    const dispatchGlobal = useDispatch();

    const makeCartEmptyOnApprove = () => {
        dispatchGlobal(addAllItemsToTheCart([]));
        dispatchGlobal(updatePaymentType(null));
        dispatchGlobal(updateShippingToInitialState());
        dispatchGlobal(updateMeasurementToInitialState());
        setMeasurementJourney && setMeasurementJourney(OrderProcess.order_completed);
    }

    useEffect(() => {
        const fetchPaypalClientIdForBusiness = async () => {
            dispatch({ type: FETCHING, payload: true });
            try {
                const { clientId } = await request({
                    url: `${APIS.paypal.clientId}/${id}`,
                    method: 'get'
                });

                dispatch({ type: FETCHED, payload: clientId });

            } catch (err) {
                console.error(`Could not fetch data ${err}`);
            }
            dispatch({ type: FETCHING, payload: false });
        }
        if (id) fetchPaypalClientIdForBusiness();
    }, [id]);

    if(!id) {
        return <div>Please provide the business id</div>;
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div className="error">{error.toString()}</div>
    }

    return (
        <>{clientId ? <div>
            <PayPalScriptProvider options={{ clientId, components: "buttons", currency: currency }}>
                <ButtonWrapper 
                  showSpinner={false} id={id ?? ''}
                  makeCartEmptyOnApprove={makeCartEmptyOnApprove}
                  />
            </PayPalScriptProvider>
        </div> : <div className="notfound">Client Id not</div>}</>
    );
}