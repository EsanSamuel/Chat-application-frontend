"use client"
import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
    id: string;
    label: string;
    type?: string;
    required?: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input = ({ id, label, type, required, register, errors, disabled }: InputProps) => {
    return (
        <div>
            <label htmlFor={id} className='block text-sm font-medium text-gray-900 leading-6'>
                {label}
                <div className='mt-2'>
                    <input
                        id={id}
                        type={type}
                        disabled={disabled}
                        autoComplete={id}
                        {...register(id, { required })}
                        className={clsx(`
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0 
                        py-1.5
                        text-gray-900
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        focus:ring-2
                        focus:ring-inset 
                        focus:ring-sky-600
                        sm:text-sm 
                        sm:leading-6`,
                            errors[id] && "focus:ring-rose-500",
                            disabled && "opacity-50 cursor-default"
                        )}
                    />
                </div>
            </label>
        </div>
    )
}

export default Input