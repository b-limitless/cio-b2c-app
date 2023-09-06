import React, { ReactNode } from 'react';
import styles from './form.module.scss';

interface FormTemplate {
    children: ReactNode
}
export default function FormTemplate({ children }: FormTemplate) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
