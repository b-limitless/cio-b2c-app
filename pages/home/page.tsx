import React from 'react';
import styles from './home.module.scss';
import Header from 'components/Header/Header';

export default function Home() {
    return (
        <div className="styles page__container">
            <Header />
            <div className="styles mid__content">
                <div className="styles col">
                    <div className="styles contents">
                        <div className="styles normal">
                            Made to Measure
                        </div>
                        <div className="styles bold">
                            that fit you perfectly
                        </div>
                        <div className="styles description">
                            Shirts that fit you perfectly. Choose a custom dress shirt designed by you. Make a statement with a made to measure shirt perfect for any occasions, whether it {'\\'} s business or casual we will tailor the perfect men s dress shirt for you. Buy the best custom dress shirt online.
                        </div>
                        <button>
                            <span>Design shirt</span>
                            <span>
                                <img src="/icon/arrow-right-bold.svg" alt="" />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="styles col">
                    <img src="/img/man.png" alt="" />
                </div>
            </div>

        </div>
    )
}
