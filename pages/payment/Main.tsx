
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
import { OrderProcess } from "types/enums";
import { request } from "utils/request";

// This value is from the props in the UI
const style: any = { "layout": "vertical" };
type TId = string | string[];

async function createOrder(id:TId) {

    try {
        const {id:orderId} = await request({url: `${APIS.paypal.createOrder}/${id}`, method: 'post'});

        return orderId; 
    } catch(err) {
        console.error(`Could not create an order ${err}`);
        throw new Error(`Could not create an order ${err}`)
    }
}
async function onApprove(data: any, id:TId, makeCartEmptyOnApprove:Function) {

    try {
         await request({
            url: `${APIS.paypal.onApprove}/${id}`,
            method:'post', 
            body: {orderID: data.orderID}
        });
        // Make the cart empty 
        makeCartEmptyOnApprove();
        // Update the user journey to order completed

    } catch(err) {
        console.error(`Unable to approve the request ${err}`);
        throw new Error(`Unable to approve the request ${err}`)
    }
}
const disabledFunding = {
    disallowed: ['card'],
};

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