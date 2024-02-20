import React from 'react'

export default function Profile() {
    return (
        <div className='flex gap-2'>
            <img 
                src='./user'
                alt="u"
            />
            <div className='flex flex-col text-xl'>
                <h2>username</h2>
                <p>click to see</p>
            </div>
        </div>
    )
}