import type { MessageInstance, MessagePlacementList } from 'tdesign-vue-next/es/message/type'
import { MessagePlugin } from 'tdesign-vue-next'

const infoMessage = (message: string, duration = 3000, placement: MessagePlacementList = 'top'): Promise<MessageInstance> => {
  return MessagePlugin.info({
    content: message,
    duration,
    placement,
    closeBtn: true
  })
}

const successMessage = (message: string, duration = 3000, placement: MessagePlacementList = 'top'): Promise<MessageInstance> => {
  return MessagePlugin.success({
    content: message,
    duration,
    placement,
    closeBtn: true
  })
}

const warningMessage = (message: string, duration = 3000, placement: MessagePlacementList = 'top'): Promise<MessageInstance> => {
  return MessagePlugin.warning({
    content: message,
    duration,
    placement,
    closeBtn: true
  })
}

const errorMessage = (message: string, duration = 3000, placement: MessagePlacementList = 'top'): Promise<MessageInstance> => {
  return MessagePlugin.error({
    content: message,
    duration,
    placement,
    closeBtn: true
  })
}

const loadingMessage = (message: string, duration = 0, placement: MessagePlacementList = 'top'): Promise<MessageInstance> => {
  return MessagePlugin.loading({
    content: message,
    duration,
    placement,
    closeBtn: false
  })
}

const closeMessage = (messageInstance: Promise<MessageInstance>) => {
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
