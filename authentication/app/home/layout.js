import React from 'react';
import Sidenav from '../ui/sidenav';

export default function Layout({ children }) {
    return (
        <main className='flex min-h-screen w-full mt-0'>
            <div className='hidden sm:flex'>
                <Sidenav/>
            </div>

            <div className=' w-full flex'>
                    {children}
            </div>
        </main>
    )
}