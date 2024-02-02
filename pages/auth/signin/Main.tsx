import React from 'react'

interface IMain {
    userId:string | string[] | null;
}

export default function Main({userId}: IMain) {
  return (
    <div>Signin</div>
  )
}
