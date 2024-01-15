import { createSlice } from "@reduxjs/toolkit";

export interface IShipping {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string; // Optional
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    countryCode:string;
}