import getConversationById from '@/app/actions/getConversationById'
import getMessages from '@/app/actions/getMessages'
import EmptyState from '@/app/components/EmptyState'
import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Form from './components/Form'

interface IParams {
    conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className='lg:pl-80 h-[100vh]'>
                <div className='h-full flex flex-col'>
                    <EmptyState />
                </div>
            </div>
        )
    }
    return (
        <div className='lg:pl-80 h-[100vh]'>
            <div className='h-full flex flex-col'>
                <Header conversation={conversation} />
                <Body initialMessage={messages} />
                <Form />
            </div>
            </div>
    )
}

export default ConversationId