"use client"
import { useEffect } from 'react'
import Button from "@/app/components/Button"
import Input from "@/app/components/inputs/Input"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import AuthSocialButton from "./AuthSocialButton"
import { BsGoogle } from 'react-icons/bs'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import getCurrentUser from '@/app/actions/getCurrentUser'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm: any = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [variant, setVariant] = useState<Variant>("LOGIN")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const getUser = async () => {
            const currentUser = await getCurrentUser()
            console.log({ currentUser })
        }
        getUser()
    }, [])


    useEffect(() => {
        if (status === "authenticated") {
            console.log("Authenticated!")
            router.push('/users')
        }
    }, [status])

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER")
        } else {
            setVariant("LOGIN")
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant === 'REGISTER') {
            console.log(data)
            axios.post('/api/register', data)
                .then(() => signIn("credentials", data))
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => setIsLoading(false))

        }

        if (variant === 'LOGIN') {
            signIn("credentials", {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error("Invalid credentials!")
                    }

                    if (callback?.ok && !callback?.error) {
                        toast.success("Logged in!")
                    }
                }).finally(() => setIsLoading(false))
        }

    }

    const socialAction = async (action: string) => {
        setIsLoading(true)
        await signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid credentials!")
                }

                if (callback?.ok && !callback?.error) {
                    toast.success("Logged in!")
                }

            }).finally(() => setIsLoading(false))
    }
    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && (
                        <Input label='Name' id='name' type="text" register={register} errors={errors} />
                    )}
                    <Input label='Email' id='email' type="email" register={register} errors={errors} />
                    <Input label='Password' id='password' type="password" register={register} errors={errors} />
                    <div>
                        <Button fullWidth onClick={() => onSubmit} disabled={isLoading} type="submit">
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className='mt-6'>
                    <div className="relative">
                        <div className='absolute inset-0 flex items-center'>
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
                    </div>
                </div>

                <div className="flex gap-2 justify-center text-sm mt-6 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? 'New to messenger?' : 'Already have an account? '}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm