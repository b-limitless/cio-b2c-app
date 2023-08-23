import React from 'react';
import styles from './header.module.scss';
import Image from 'next/image';

export interface navigationRow {
    title: string;
    value: string;
}


export interface NavigationInterface {
    data: navigationRow[]
}

const NavigationItem = ({ title, value }: navigationRow) => {
    return <>
        <input type="radio" className={styles.navigation__radio} name="navigation" id={value} />
        <label htmlFor={value}>
            <li>
                <span>
                    {title}
                </span>
                <span>
                    <Image
                        src={'/icon/arrow-right.svg'}
                        height={11}
                        width={6.29}
                        alt=''
                    >
                    </Image>
                </span>
            </li>
        </label>
    </>
}

export default function Navigation({ data }: NavigationInterface) {
    return (
        <ul>
            {data.map((item: navigationRow, i) => <NavigationItem key={`navigation-item-${i}`} title={item.title} value={item.value} />)}
        </ul>
    )
}
