import Header from 'components/Header/Header';
import FormTemplate from 'pages/order/template/form';
import React from 'react';
import styles from 'style-module/shipping.module.scss'

interface IMain {
    userId: string | string[] | null;
}

export default function Main({ userId }: IMain) {
    return (
        <>
            <Header
                userId={userId ?? ''}
                showNavigation
            />
            <FormTemplate>
                <div className={styles.shipping}>
                    <div className={styles.form__row}>
                        
                    </div>
                </div>
            </FormTemplate>
        </>

    )
}
