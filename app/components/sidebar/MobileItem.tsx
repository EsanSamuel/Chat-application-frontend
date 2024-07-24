import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface MobileItemProps {
    active?: boolean
    icon: any
    href: string
    onClick?: () => void
    label: string
}


const MobileItem: React.FC<MobileItemProps> = ({ active, icon: Icon, label, href, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            if (typeof window !== 'undefined') {
                return onClick()
            }
        }
    }
    return (
        <Link onClick={handleClick} href={href}
            className={clsx(`
          group
          flex
          gap-x-3
          gap-sm
          leading-6
          font-semibold
          w-full
          justify-center
          p-4
          text-gray-500
          hover:text-black
          hover:bg-gray-100
        `, active && 'bg-gray-100 text-black')}
        >
            <Icon className='w-6 h-6' />
        </Link>
    )
}

export default MobileItem