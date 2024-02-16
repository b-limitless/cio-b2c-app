import React from 'react';
import styles from './febric-details-v1.module.scss';
import { svgCDNAssets } from 'config/assets';
import Image from 'next/image';

export default function FebricDetailsV1() {
    return (

        <div className={styles.fabric_container}>
            <Image className={styles.closeImg}src={`${svgCDNAssets.crossIcon}`} alt='' width={18} height={18} />
            
            <div className={styles.row}>
                <img className={styles.fabric_image} src="https://res.cloudinary.com/dun5p8e5d/image/upload/v1706100128/cio-assets/img/premium-linen-fabric-fabric-dusty-mint-green-plain-premium-60-lea-pure-linen-shirting-fabric-width-58-inches-36564388282543_fi7kry.jpg" alt="Fabric Thumbnail" />

            </div>

            <div className={styles.row}>
                <div className={styles.details}>
                <div className={styles.detail}>
                    <h2>Fabric Details</h2>
                    <p><strong>Title:</strong> Dr</p>
                    <p><strong>Price:</strong> $144.82</p>
                    <p><strong>Delivery Time:</strong> 5-7 business days</p>
                    <p><strong>Excellence:</strong> Low</p>
                    <p><strong>Warmth:</strong> Medium</p>
                    <p><strong>Weight:</strong> Heavy</p>
                    <p><strong>Thread Style:</strong> Smooth</p>
                    <p><strong>Brightness:</strong> Neutral</p>

                </div>

                <div className={styles.detail}>
                    <h2>Characteristics</h2>
                    <ul>
                        <li>Breathable</li>
                        <li>Durable</li>
                        <li>Soft</li>
                    </ul>
                </div>

                <div className={styles.detail}>
                    <h2>Compositions</h2>
                    <ul>
                        <li>Silk: 63%</li>
                        <li>Cotton: 38%</li>

                    </ul>
                </div>
                </div>
                
            </div>

        </div>
    )
}
