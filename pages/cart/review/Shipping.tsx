import React from 'react';
import styles from '../cart.module.scss';
import { IShipping } from 'slices/shippingSlice';
import { shipping } from 'config/apis';

interface IShippingLocal {
    data: IShipping
    setMeasurementJourney:Function | undefined;
}

// firstName: 'John',
//       lastName: 'Doe',
//       addressLine1: '123 Main St',
//       addressLine2: 'Apt 4',
//       city: 'Cityville',
//       state: 'Stateville',
//       postalCode: '12345',
//       country: 'Countryland',
//       phoneNumber: '1234567890',
//       countryCode: '1',
//       email: 'john.doe@example.com',

export default function Shipping({data, setMeasurementJourney}: IShippingLocal) {

    console.log('setMeasurementJourney', setMeasurementJourney)
    return (
        <div className={styles.shipping}>
            <div className={styles.row}>
                <div className={styles.address}>Shipping Address</div>
            </div>

            <div className={styles.row}>

                <div className={styles.sub_row}>
                    <div className={styles.col}>
                        {data?.firstName} {data?.lastName}
                    </div>

                    <div className={styles.col}>
                        <span className={styles.phone_number}>
                            {data?.countryCode} {data?.phoneNumber}  
                        </span>

                    </div>
                </div>
                <div className={styles.sub_row}>
                    <div className={styles.col}>
                        <span className={styles.shpping_address}>
                        {data.addressLine1} {data.addressLine2} {data?.city} {data?.state}  {data?.country} {data?.postalCode}
                        </span>

                    </div>
                    <div className={styles.col}>
                        <span className={styles.change} onClick={() => setMeasurementJourney ? setMeasurementJourney('shipping') : null
                        }>Change</span>

                    </div>

                </div>
            </div>

        </div>
    )
}
