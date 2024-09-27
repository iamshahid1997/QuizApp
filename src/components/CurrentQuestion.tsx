import { Option, Question } from '@/utils/quiz/types'
import React from 'react'
import Image from 'next/image';
import OptionContainer from './OptionContainer';

interface CurrentQuestionProps {
    question: Question;
    selectedOptions: Option[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>
}

export default function CurrentQuestion({ question, selectedOptions, setSelectedOptions }: CurrentQuestionProps) {


    function handleSelectedOptions(option: Option) {
        const isSelected = selectedOptions.some((o) => o.optionText === option.optionText);
        if (isSelected) {
            // Remove the option from selectedOptions if it's already selected
            setSelectedOptions((prev) => {
                const newSelectedOptions = prev.filter((o) => o.optionText !== option.optionText);
                return newSelectedOptions;
            });
        } else {
            // Add the option to selectedOptions if it's not selected
            setSelectedOptions((prev) => {
                const newSelectedOptions = [...prev, option];
                return newSelectedOptions;
            });
        }
    }
    return (
        <div className='w-full h-full overflow-y-auto pt-24 flex flex-col gap-y-4'>
            <p className='font-black text-2xl'>{question.questionText}</p>
            {question.image && (
                <div className='flex justify-center'>
                    <Image
                        src={question.image}
                        width={80}
                        height={100}
                        alt="celebrate"
                        className='object-cover'
                    />
                </div>
            )}
            {question.options.map((option, index) => (
                <OptionContainer
                    key={index}
                    option={option}
                    isSelected={selectedOptions.some((o) => o.optionText === option.optionText)}
                    handleSelectedOptions={handleSelectedOptions}
                />
            ))}
        </div>
    )
}
