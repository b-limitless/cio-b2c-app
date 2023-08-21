import React from 'react';
import styles from './header.module.scss';
import Image from 'next/image';


export default function Header() {
  return (
    <header className="styles header">
        <div className="styles col">
        <Image
        src={'/icon/logo.svg'}
        width={206}
        height={46}
        alt='logo'
        />
        </div>
        <div className="styles col">
            <div className="styles nav">
                <ul>
                    <li>
                        <span>
                            Febric
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

                    <li>
                        <span>
                            style
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
                    <li>
                        <span>
                            accent
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
                </ul>
            </div>
        </div>

        <div className="styles side__menu">
            <div className="styles menu">
                clothing
            </div>
            <div className="styles icon">
                <Image
                src={'/icon/cart.svg'}
                width={32}
                height={30.55}
                alt='cart'
                ></Image>
            </div>
        </div>
    </header>
  )
}
