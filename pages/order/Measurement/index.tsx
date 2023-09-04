import { Button } from 'components/Button'
import Input from 'components/Input'
import Select from 'components/Select'
import React from 'react';
import Image from 'next/image';

export default function Measurment() {
    return (
        <div className='styles measurement__container'>
            <div className='styles measurement__form'>
                <div className='styles title'>
                    and now, let{'\''}s measure!
                </div>
                <p className='styles description'>
                    We are going to create your body measurements profile. All we need is some basic information.
                </p>
                <div className='styles form__row'>
                    <Input label='Full Name' />
                </div>
                <p className="styles unite">
                    Change Unite feet/lb or cm/kg
                </p>
                <div className="styles form__row">
                    <Select
                        options={[]}
                        value=''
                        label=''
                        onChange={() => { }}
                    />

                    <Select
                        options={[]}
                        value=''
                        label=''
                        onChange={() => { }}
                    />

                    <Select
                        options={[]}
                        value=''
                        label=''
                        onChange={() => { }}
                    />
                    <Select
                        options={[]}
                        value=''
                        label='Age'
                        onChange={() => { }}
                    />
                </div>
                <p className="style accurate">
                    The more accurate you give your height and weight, the better the system will help you take your measurements.
                </p>

                <div className="styles form__row">
                    <Button variant='primary' type='square'>
                        Next
                    </Button>
                </div>
            </div>
            <div className="styles video__guide">
                <Image src='/img/video.png' width={1190} height={670} alt='' />
            </div>
            <div className="styles time__tape">
                <div className="styles col">
                    <Image src='/icon/time.svg' width={60} height={60} alt='time' />
                    <span className="styles sub">Are you in a hurry?</span>
                    <span className="styles uppercase">
                        COMPLETE YOUR ORDER
                    </span>
                    <span className="styles rest">
                        and take your measurements later
                    </span>
                </div>

                <div className="styles col">
                    <Image src='/icon/time.svg' width={60} height={60} alt='time' />
                    <span className="styles sub">Are you in a hurry?</span>
                    <span className="styles uppercase">
                        COMPLETE YOUR ORDER
                    </span>
                    <span className="styles rest">
                        and take your measurements later
                    </span>
                </div>
            </div>
        </div>
    )
}
