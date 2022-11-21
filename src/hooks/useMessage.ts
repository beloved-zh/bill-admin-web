import type { MessageInstance, MessagePlacementList } from 'tdesign-vue-next/es/message/type'
import { MessagePlugin } from 'tdesign-vue-next'

const infoMessage = (message:string, duration:number = 3000, placement:MessagePlacementList = 'top'):Promise<MessageInstance> => {
    return MessagePlugin.info({
        content: message,
        duration: duration,
        placement: placement,
        closeBtn: true
    })
}

const successMessage = (message:string, duration:number = 3000, placement:MessagePlacementList = 'top'):Promise<MessageInstance> => {
    return MessagePlugin.success({
        content: message,
        duration: duration,
        placement: placement,
        closeBtn: true
    })
}

const warningMessage = (message:string, duration:number = 3000, placement:MessagePlacementList = 'top'):Promise<MessageInstance> => {
    return MessagePlugin.warning({
        content: message,
        duration: duration,
        placement: placement,
        closeBtn: true
    })
}

const errorMessage = (message:string, duration:number = 3000, placement:MessagePlacementList = 'top'):Promise<MessageInstance> => {
    return MessagePlugin.error({
        content: message,
        duration: duration,
        placement: placement,
        closeBtn: true
    })
}

const loadingMessage = (message:string, duration:number = 0, placement:MessagePlacementList = 'top'):Promise<MessageInstance> => {
    return MessagePlugin.loading({
        content: message,
        duration: duration,
        placement: placement,
        closeBtn: false
    })
}

const closeMessage = (messageInstance:Promise<MessageInstance>) => {
    MessagePlugin.close(messageInstance)
}

const closeAllMessage = () => {
    MessagePlugin.closeAll()
}

export {
    infoMessage,
    successMessage,
    warningMessage,
    errorMessage,
    loadingMessage,
    closeMessage,
    closeAllMessage
}