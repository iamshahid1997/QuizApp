import React from 'react';

interface ButtonProps {
    text: string;
    type: "button" | "submit"
    onClick: () => void;
}

export default function Button({ text, type, onClick }: ButtonProps) {
    return (
        <button
            type={type}
            className='bg-secondary text-white text-xl w-full flex item-center justify-center rounded-full p-4 font-black'
            onClick={onClick}
        >
            {text}
        </button>
    )
}
