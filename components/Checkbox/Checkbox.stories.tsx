import React from 'react';
import Checkbox from './Checkbox';
import {CheckboxWithLabel} from './Checkbox';


export default {
    title: "Components/v1/Checkbox",
    component: Checkbox,
    argTypes: {handleClick: {action: 'handleClick'}}
}

const Template = (args:any) => <Checkbox {...args} />

const Tempalte1 = (args:any) => <CheckboxWithLabel {...args}/>

export const Default:any =  Template.bind({});
export const DefaultWithLable:any = Tempalte1.bind({});

DefaultWithLable.args = {
    label: "Hello World"
}
Default.args = {
    backgroundColor: 'Default',
    label: 'press me', 
    size: 'md'
}



