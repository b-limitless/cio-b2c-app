export const modelsURL = {
    shirt: '/models/shirt/shirt-without-collar-and-cuff.glb',
}

export const productStyles = [{
    label: 'collars',
    code: 'collar',
    childrens: [
        {
            id: 1,
            label: 'button down',
            code: 'button_down',
            mediaUrl: '/icon/collars/button-down.svg',
            model: `/models/collars/collar-3-3.glb`
        },
        {
            id: 2,
            label: 'club',
            code: 'club',
            mediaUrl: '/icon/collars/club.svg', 
            model: `/models/collars/collar-2-2.glb`
        },
        {
            id:3,
            label: 'cutway',
            code: 'cutway',
            mediaUrl: '/icon/collars/cutway.svg',
            model: `/models/collars/collar-1-1.glb`
        },
    ]
},
{
    label: 'cuffs',
    code: 'cuff',
    childrens: [
        {
            id:5,
            label: 'french',
            code: 'button_down',
            mediaUrl: '/icon/cuff/french.svg',
            model: `/models/cuffs/cuff-1-normal.glb`
        },
        {
            id:6,
            label: 'one button',
            code: 'one_button',
            mediaUrl: '/icon/cuff/one-button.svg', 
            model: `/models/cuffs/cuff-2-normal.glb`
        },
        {
            id:7,
            label: 'three button',
            code: 'button_down',
            mediaUrl: '/icon/cuff/three-button.svg', 
            model: `/models/cuffs/cuff-3-normal.glb`
        },
       
    ]
}
]