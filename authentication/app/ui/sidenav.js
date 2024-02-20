import React from 'react';
import { kings } from '../fonts';
import NavElements from './navElements';
import Profile from './profile';
import Link from 'next/link';

export default function Sidenav() {
    return (
        <div className='text-white h-full sm:min-w-24 justify-center xl:justify-start xl:min-w-60 border-r border-white flex flex-col gap-20 p-4'>
            <h1 className={` ${kings.className} text-2xl pl-4 pt-2 hidden md:flex`}>
                winning syrus
            </h1>

            <div className='justify-center flex h-full'>
                <NavElements/>
            </div>

            <div className='flex flex-col items-center'>
                <Link href={'/home/profile'}>
                    <Profile/>
                </Link>
                <button className='border border-white  p-3 text-xl rounded-2xl hover:bg-white hover:text-black '>
                    Logout
                </button>
            </div>
        </div>
    )
}