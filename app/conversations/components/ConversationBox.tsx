import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/types'
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
            router.push(`/convevrstion/${data.id}`)
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
    return (
        <div>ConversationBox</div>
    )
}

export default ConversationBox