import { createSlice } from "@reduxjs/toolkit";

const model = {
    collar: {
        id: 12,
        model: 'URL for the model to load from CDN'
    }, 
    scuff: {
        id: 13,
        model: 'URL for the model to load'
    }, 
    sleeves: {
        id: 13,
        model: 'URL for the model to load'
    },
    checkpocket: {
        id: 13,
        model: 'URL for the model to load'
    }
}

const accent = {
    collar: {
        selected: 'By Default', 
        febric: {
            id: null,
            url: 'http://'
        }
    }, 
    cuff: {
        selected: 'By Default',
        febric: {
            id: null, 
            url: 'http://'
        }
    }, 
}

type modeType = typeof model;
type accentType = typeof accent;

interface initialState {
    model: modeType | null;
    accent: accentType | null;
}

const initialState:initialState = {
    model:null,
    accent: null
}

const modelSlice = createSlice({
    name: 'model', 
    initialState,
    reducers:{

    }
});

