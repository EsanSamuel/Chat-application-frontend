import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/types'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

interface ConversationBoxProps {
    data: FullConversationType
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
    const otherUser = useOtherUser(data)
    const { data: session } = useSession()
    const router = useRouter()

    const handleClick = useCallback(
        () => {
            router.push(`/conversation/${data.id}`)
        },
        [router, data.id],
    )

    const lastMessage = useMemo(() => {
        const messages = data.messages || []

        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session?.user?.email
    }, [session?.user?.email])

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false
        }
        const seenArray = lastMessage.seen || []

        if (!userEmail) {
            return false
        }
        return seenArray.filter((user) => user.email === userEmail).length !== 0
    }, [])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image'
        }

        if (lastMessage?.body) {
            return lastMessage.body
        }

        return 'Started a conversation'
    }, [lastMessage])
    return (
        <div onClick={handleClick} className={clsx(`
            w-full
            relative
            flex
            gap-2
            items-center
            sapce-x-3
            hover:bg-neutral-100
            rounded-lg
            transition
            cursor-pointer
            p-2
            `, selected ? "bg-neutral-100" : "bg-white")}>
            <Avatar user={otherUser} />
            <div className='min-w-0 flex-1'>
                <div className="focus:outline-none">
                    <div className='flex justify-between items-center mb-1'>
                        <p className='text-md font-medium text-gray-900'>
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className='text-xs text-gray-400 font-light'></p>
                        )}
                    </div>
                    <p className={clsx(`
                    truncate
                    text-sm
                    font-light
                    `, hasSeen ? "text-gray-500" : "text-black font-medium")}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox