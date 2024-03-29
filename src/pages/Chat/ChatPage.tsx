import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import { ChatMessageApiType } from "../../api/chat-api.ts";
//@ts-ignore
import { startMessagesListening, stoptMessagesListening, sendMessage } from "../../redux/chat-reducer.ts";
//@ts-ignore
import { AppStateType } from "../../redux/redux-store.ts";




const ChatPage: React.FC = () => {
    return(
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()
    
    const status = useSelector((state: AppStateType) => state.chat.status)
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stoptMessagesListening())
        }
    }, [])    
    return (
        <div>
            {status === 'errore' && <div>Some errore occured. Please refresh the page</div>}
            <>
            <Messages />
            <AddMessageForm />
            </>
        </div>
    )
}
const Messages: React.FC<{}> = ({}) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300){
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        if(isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    return (
        <div style={{ height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
const Message: React.FC<{message: ChatMessageApiType}> = React.memo(({message}) => {
    return (
        <div>
            <img src={message.photo} alt='miniPhoto' style={{width: '30px'}}/><b>{message.userName}</b>
            <br />
            {message.message}
            <hr/>
        </div>
    )
})
const AddMessageForm: React.FC<{}> = ({}) => {
    const [message, setMessege] = useState('')
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if(!message){
            return
        }
        dispatch(sendMessage(message))
        setMessege('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessege(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}
export default ChatPage