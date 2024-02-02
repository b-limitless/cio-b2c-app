import React from 'react'

interface IFormHelperText {
    text: string | null;
}

const myStyles: any = {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    textAlign: "left",
    marginTop: "3px",
    marginRight: "14px",
    marginBottom: 0,
    marginLeft: "14px",
    color: "#d32f2f",
};

export default function ErrorText({ text }: IFormHelperText) {
    return (
        <div
            style={myStyles}
        >{text}</div>
    )
}
