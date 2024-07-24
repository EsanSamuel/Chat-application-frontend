import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface DesktopItemProps {
    active?: boolean
    icon: any
    href: string
    label: string
    onClick?: () => void
}

const DesktopItem: React.FC<DesktopItemProps> = ({ active, icon: Icon, href, label, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }
    return (
        <li onClick={handleClick}>
            <Link href={href}
                className={clsx(`
                group
                flex
                gap-x-3
                rounded-md
                text-sm
                leading-6
                font-semibold
                text-gray-500
                hover:text:black
                hoverf:bg-gray-100
                `, active && 'bg-gray-100 text-black')}
            >
                <Icon className='h-6 w-6 shrink-0' />
                <span className='sr-only'>{label}</span></Link>
        </li>
    )
}

export default DesktopItem