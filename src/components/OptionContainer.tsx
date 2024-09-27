import { Option } from '@/utils/quiz/types'
import React from 'react'
import { IoCheckmarkOutline } from "react-icons/io5";

interface OptionContainerProps {
    option: Option;
    isSelected: boolean;
    handleSelectedOptions: (option: Option) => void;
}

export default function OptionContainer({ option, isSelected, handleSelectedOptions }: OptionContainerProps) {
    return (
        <div className={`w-full px-4 py-4 flex items-start gap-x-3 border-2  rounded-2xl
        ${isSelected ? 'border-[#44B77B]' : 'bg-[#F3F4FA] border-[#F3F4FA]'}
        `}
            onClick={() => {
                handleSelectedOptions(option)
            }}
        >
            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-white
            ${isSelected ? 'border-[#44B77B] bg-[#44B77B] ' : 'border-gray-300'}
            `}>
                {isSelected ? <IoCheckmarkOutline /> : null}
            </div>
            <p className='font-semibold'>{option.optionText}</p>
        </div>
    )
}
