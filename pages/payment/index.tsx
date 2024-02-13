
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

// This value is from the props in the UI
const style:any = {"layout":"vertical"};

function createOrder() {
  // replace this url with your server
  return fetch("http://localhost:9000/create-order", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        items: [
          {
            id: 1,
            quantity: 2,
          },
          {
            id: 2,
            quantity: 3,
          },
        ],
      })
  })
      .then((response) => response.json())
      .then((order) => {
          // Your code here after create the order
          return order.id;
      });
}
function onApprove(data:any) {
  // replace this url with your server
  return fetch("http://localhost:9000/on-approve", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          orderID: data.orderID,
      }),
  })
      .then((response) => response.json())
      .then((orderData) => {
          // Your code here after capture the order
      });
}
const disabledFunding = {
  disallowed: ['card'],
};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }: {showSpinner:boolean}) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
      <>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[style]}
              fundingSource={'paypal'}
              createOrder={createOrder}
              onApprove={onApprove}
          />
      </>
  );
}
const clientId = 'Ac6nMldXTPswhC3ggmK4kBzag03BCmIJR94AbIVVM6XjI1mqlnZkXkpuxSA9VkXOxIJLyMdsJ2l3rcH-';


export default function App() {
  return (
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
          <PayPalScriptProvider options={{ clientId, components: "buttons", currency: "USD" }}>
              <ButtonWrapper showSpinner={false}/>
          </PayPalScriptProvider>
      </div>
  );
}