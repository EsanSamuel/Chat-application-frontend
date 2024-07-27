"use client"
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface MessageInputProps {
    register: UseFormRegister<FieldValues>
    placeholder: string
    errors: FieldErrors
    id: string
    type: string
    required: boolean

}

const MessageInput: React.FC<MessageInputProps> = ({ register, placeholder, errors, id, type, required }) => {
    return (
        <div className='relative w-full'>
            <input
                id={id}
                type={type}
                {...register(id, { required })}
                autoComplete={id}
                placeholder={placeholder}
                className='text-black 
                font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'
            />
        </div>
    )
}

export default MessageInput