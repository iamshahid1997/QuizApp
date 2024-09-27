import React from 'react'

interface ReviewBoxProps {
    totalCount: number;
    correctBox: boolean;
}

export default function ReviewBox({ totalCount, correctBox }: ReviewBoxProps) {
    return (
        <div className={`w-full px-5 py-6 flex items-center gap-x-3 rounded-xl
        ${correctBox ? 'bg-green-100' : 'bg-red-100 '}
        `}>
            <div className={`h-4 w-4  rounded-full 
            ${correctBox ? 'bg-[#44B77B]' : 'bg-[#FF3B3F]'}
            `}></div>
            <p>{totalCount}</p>
            <p className='text-gray-500'>{correctBox ? 'Correct' : 'Incorrect'}</p>
        </div>
    )
}
