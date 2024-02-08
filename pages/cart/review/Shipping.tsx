import React from 'react';
import styles from '../cart.module.scss';

export default function Shipping() {
    return (
        <div className={styles.shipping}>
            <div className={styles.row}>
                <div className={styles.address}>Shipping Address</div>
            </div>

            <div className={styles.row}>

                <div className={styles.sub_row}>
                    <div className={styles.col}>
                        Shahil Misran
                    </div>

                    <div className={styles.col}>
                        <span className={styles.phone_number}>+971 56598789745</span>

                    </div>
                </div>
                <div className={styles.sub_row}>
                    <div className={styles.col}>
                        <span className={styles.shpping_address}>
                            901 Qubaisi Building. 16, Talaha Bin Obaid street, Abu Shagara, Sharjah.
                        </span>

                    </div>
                    <div className={styles.col}>
                        <span className={styles.change}>Change</span>

                    </div>

                </div>
            </div>

        </div>
    )
}
