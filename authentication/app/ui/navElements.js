import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NavElements() {
    return (
        <div className='flex flex-col gap-8  text-xl text-gray-100'>
            <Link href={'/home'}>
                <div className='flex gap-2 justify-start items-center cursor-pointer'>
                    <Image
                        src="/home.svg"
                        alt="home icon"
                        height={29}
                        width={29}
                        className='invert'
                    />
                    <h2 className='hidden md:flex'>Home</h2>
                </div>
            </Link>

            <div className='flex gap-2 justify-start items-center cursor-pointer'>
                <Image
                    src="/search.svg"
                    alt="search"
                    height={29}
                    width={29}
                    className='invert'
                />
                <h2 className='hidden md:flex'>Search</h2>
            </div>


            <Link href="/home/Messages">
                <div className='flex gap-2 justify-start items-center cursor-pointer'>
                    <Image
                        src="/chat.svg"
                        alt="chat icon"
                        height={29}
                        width={29}
                        className='invert'
                    />
                    <h2 className='hidden md:flex'>Messages</h2>
                </div>
            </Link>

            <div className='flex gap-2 justify-start items-center'>
                <Image
                    src="/notification.svg"
                    alt="alert icon"
                    height={29}
                    width={29}
                    className='invert'
                />
                <h2 className='hidden md:flex'>Alerts</h2>
            </div>

            <div className='flex gap-2 justify-start items-center'>
                <Image
                    src="/settings.svg"
                    alt="settings icon"
                    height={29}
                    width={29}
                    className='invert'
                />
                <h2 className='hidden md:flex'>Settings</h2>
            </div>
        </div>
    )
}