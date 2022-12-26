let subscribers = {
    'message-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null
type EventsNamesType = 'message-received' | 'status-changed'
const closeHandler = () => {
    notifySubscruibersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscruibersAboutStatus('ready')
}
const erroreHandler = () => {
    notifySubscruibersAboutStatus('errore')
    console.log('REFRESH PAGE')
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('errore', erroreHandler)
}
const notifySubscruibersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}
function createChannel(){
    cleanUp()
    ws?.close()
            
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscruibersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('errore', erroreHandler)
   
}
    
export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type ChatMessageApiType = {
    message: string
    photo: string
    userId: number
    userName: string    
}
export type StatusType = 'pending' | 'ready' | 'errore'