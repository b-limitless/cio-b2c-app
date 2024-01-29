import useFetchCart from 'hooks/useFetchCart';
import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react'

interface IMainLayout {
    children: ReactNode;
}
function MainLayout({ children }: IMainLayout) {
    useFetchCart();
    return (
        <>{children}</>
    )
}

export default dynamic(() => Promise.resolve(MainLayout), { ssr: false });