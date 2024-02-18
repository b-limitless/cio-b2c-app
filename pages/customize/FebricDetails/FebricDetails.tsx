import React from 'react';
import styles from './febric-details-v1.module.scss';
import { svgCDNAssets } from 'config/assets';
import Image from 'next/image';

const febric = {
    "characters": [
        "Breathable",
        "Durable",
        "Soft"
    ],
    "compositions": [
        {
            "component": "Silk",
            "percentage": 63
        },
        {
            "component": "Cotton",
            "percentage": 38
        },
        {
            "component": "Cotton",
            "percentage": 69
        },
        {
            "component": "Silk",
            "percentage": 85
        },
        {
            "component": "Polyester",
            "percentage": 3
        },
        {
            "component": "Other",
            "percentage": 16
        }
    ],
    // "rating": [
    //     {
    //         "component": "Silk",
    //         "percentage": 63
    //     },
    //     {
    //         "component": "Cotton",
    //         "percentage": 38
    //     },
    //     {
    //         "component": "Cotton",
    //         "percentage": 69
    //     }
    // ],
    "userId": "65aa90cc181f5b0656d73e44",
    "title": "Dr",
    "price": 144.82,
    "deliveryTime": "5-7 business days",
    "excellence": "Low",
    "warmth": "Medium",
    "weight": "Heavy",
    "threadStyle": "Smooth",
    "brightness": "Neutral",
    "superShiny": false,
    "tone": "Cool",
    "opacity": "Opaque",
    "waterproof": "true",
    "stretchyText": "High Stretch",
    "stretchy": "true",
    "type": "Metal",
    "febricTypes": "Wool",
    "febricSeasons": "Summer",
    "threadTypes": "Textured",
    "threadCounts": "600 TC",
    "thumbnailImageUrl": "https://res.cloudinary.com/dun5p8e5d/image/upload/v1706100128/cio-assets/img/premium-linen-fabric-fabric-dusty-mint-green-plain-premium-60-lea-pure-linen-shirting-fabric-width-58-inches-36564388282543_fi7kry.jpg",
    "originalImageUrl": "https://res.cloudinary.com/dun5p8e5d/image/upload/v1706100126/cio-assets/img/fabric-pandit-fabric-denim-blue-plain-premium-60-lea-pure-linen-fabric-width-58-inch-36447226626223_whnopu.jpg",
    "version": 0,
    "id": "65b25738d8db760157740560"
};

const excludeKeys = ['userId', 'id', 'version', 'thumbnailImageUrl', 'originalImageUrl']

type TFebric = typeof febric;

type TObjectType = {
    [x: string]: string | number;
}

type TObjectTypeV1 = {
    [x: string]: TObjectType[]
}

enum EValue {
    array = 'array',
    object = 'objecg',
    primitive = 'primitive'
}

function checkType(value: any) {
    const firstElement = value?.[0];

    if (Array.isArray(value) && firstElement !== null && typeof firstElement !== 'object') {
        return EValue.array;
    } else if (Array.isArray(value) && typeof value[0] === 'object' && value !== null) {
        return EValue.object;
    } else {
        return EValue.primitive;
    }
}

export default function FebricDetailsV1() {

    const GetPrimitiveValueType = () => {
        const primitiveValues: React.ReactNode[] = [];
        (Object.entries(febric) as [keyof TFebric, any][]).map(([key, value]) => {

            if (checkType(febric[key]) === EValue.primitive && excludeKeys.indexOf(key) === -1) {

                primitiveValues.push(<p><strong>{key}:</strong> {value}</p>)
            }
        });

        return primitiveValues;
    }

    const filterObjectAndArrayTypeValues = () => {
        const arrayTypeValue: { [x: string]: string[] } = {};
        const objectTypeValue: TObjectTypeV1 = {};
        (Object.entries(febric) as [keyof TFebric, any][]).map(([key, value]) => {

            if (checkType(value) === EValue.array && excludeKeys.indexOf(key) === -1) {

                arrayTypeValue[key] = value
            }

            if (checkType(value) === EValue.object && excludeKeys.indexOf(key) === -1) {

                objectTypeValue[key] = value
            }

        });

        return { arrayTypeValue, objectTypeValue };
    }

    const GetArrayTypeValueInComponent = () => {
        const getArrayTypeInComponent: React.ReactNode[] = [];
        const { arrayTypeValue } = filterObjectAndArrayTypeValues();

        (Object.entries(arrayTypeValue) as [keyof TFebric, any][]).map(([key, value]) => {

            getArrayTypeInComponent.push(<><div className={styles.detail}><h2 className={styles.h2_key}>{key}</h2>
                <ul>{value.map((val: any) => <li key={`${key}-${val}`}>{val}</li>)}</ul>
            </div></>)

        });

        return getArrayTypeInComponent;

    }

    const renderKeyValuePairs = (item:TObjectType) => (
        <>
          {Object.entries(item).map(([, subVal], k) => (
            <React.Fragment key={k}>
              {k === 0 ? <strong>{subVal}</strong> : subVal}
              
               {k === 0 && <strong>:</strong> } {typeof subVal === 'number' && '%'}
            </React.Fragment>
          ))}
        </>
      );
      
      const renderObjectTypeValues = (objectTypeValue:any) => (
        <>
          {(Object.entries(objectTypeValue) as [keyof TFebric, any][]).map(([key, value]) => (
            <div className={styles.detail} key={key}>
              <h2 className={styles.h2_key}>{key}</h2>
              
              <ul>
                
                {value.map((item:any, j:number) => (
                  <li key={j}>{renderKeyValuePairs(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      );
      
      const GetObjectTypeValues = () => {
        const { objectTypeValue } = filterObjectAndArrayTypeValues();
        return renderObjectTypeValues(objectTypeValue);
      }

    return (

        <div className={styles.fabric_container}>
            <Image className={styles.closeImg} src={`${svgCDNAssets.crossIcon}`} alt='' width={18} height={18} />

            <div className={styles.row}>
                <div className={styles.image}>
                    <Image fill={true} className={styles.fabric_image} src="https://res.cloudinary.com/dun5p8e5d/image/upload/v1706100128/cio-assets/img/premium-linen-fabric-fabric-dusty-mint-green-plain-premium-60-lea-pure-linen-shirting-fabric-width-58-inches-36564388282543_fi7kry.jpg" alt="Fabric Thumbnail" />

                </div>

            </div>

            <div className={styles.row}>
                <div className={styles.details}>
                    <div className={styles.detail}>
                        <h2>Fabric Details</h2>
                        <GetPrimitiveValueType />
                    </div>



                    {/* <div className={styles.detail}>
                        <h2>Characteristics</h2>
                        <ul>
                            <li>Breathable</li>
                            <li>Durable</li>
                            <li>Soft</li>
                        </ul>
                    </div> */}
                    <GetArrayTypeValueInComponent />

                    {/* <div className={styles.detail}>
                        <h2>Compositions</h2>
                        <ul>
                            <li>Silk: 63%</li>
                            <li>Cotton: 38%</li>

                        </ul>
                    </div> */}
                    <GetObjectTypeValues />
                </div>

            </div>

        </div>
    )
}
